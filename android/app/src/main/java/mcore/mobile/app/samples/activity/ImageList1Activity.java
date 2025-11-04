package mcore.mobile.app.samples.activity;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Log;
import android.util.LruCache;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TextView;

import android.app.Activity;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import org.json.JSONArray;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;

import m.client.android.library.core.common.CommonLibHandler;
import m.client.android.library.core.common.DataHandler;
import m.client.android.library.core.common.Parameters;
import m.client.android.library.core.model.NetReqOptions;
import m.client.android.library.core.utils.IOUtils;
import m.client.android.library.core.utils.ImageLoader;
import m.client.android.library.core.utils.Logger;
import m.client.android.library.core.utils.PermissionUtil;
import m.client.android.library.core.utils.Utils;
import m.client.android.library.core.view.AbstractActivity;

public class ImageList1Activity extends AbstractActivity implements OnItemClickListener {
	public boolean singleMode = true;
	public boolean imageMode = true;
	public boolean zoomMode = false;
	public boolean detailMode = false;
	public int numColumn = 3;
	private int maxCount = 0;
	ArrayAdapter<Dir> mAdapter = null;
	boolean[] mChecked = null;
	ArrayList<Dir> mImageList = null;
	ImageLoader mImageLoader = null;
	private int LAYOUT_IMAGELIST = 0;
	private int ID_LIST = 0;
	private int ID_BACK = 0;

	private String mPath = "";

	private LruCache<String, Bitmap> mMemoryCache;

    private final OnBackInvokedCallback backCallback = () -> {
        JSONArray images = new JSONArray();
        Intent intent1 = new Intent();
        intent1.putExtra("images", images.toString());
        setResult(RESULT_OK, intent1);
        finish();
    };
    private OnBackPressedCallback callback = new OnBackPressedCallback(true) {
        //enabled false > 기본동작(finish();) 처리 / true > 백버튼 시 handleOnBackPressed() 실행
        //필요 시 callback.setEnabled(false); / callback.setEnabled(true);
        @Override
        public void handleOnBackPressed() {
            JSONArray images = new JSONArray();
            Intent intent1 = new Intent();
            intent1.putExtra("images", images.toString());
            setResult(RESULT_OK, intent1);
            finish();
        }
    };

	Context mcontext;
	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		mcontext = this;
		initID(this);
		setContentView(LAYOUT_IMAGELIST);
        CommonLibHandler.getInstance().setActivityInset(this);
		final int memClass = ((ActivityManager) this.getSystemService(Context.ACTIVITY_SERVICE)).getMemoryClass();

		// Use 1/8th of the available memory for this memory cache.
		final int cacheSize = 1024 * 1024 * memClass / 8;

		mMemoryCache = new LruCache<String, Bitmap>(cacheSize);

		Intent intent = getIntent();
		if (intent != null) {
			if(intent.getStringExtra("path") != null) {
				mPath = intent.getStringExtra("path");
				if(IOUtils.isMediaLink(mPath)){
					mPath = "";
				}else{
					mPath = IOUtils.getRealPath(getApplicationContext(), mPath);
				}
			}

			if (intent.getStringExtra("columns") != null) {
				numColumn = Integer.parseInt(intent.getStringExtra("columns"));
			}
			if (intent.getStringExtra("detailMode") != null) {
				detailMode = (intent.getStringExtra("detailMode").equals("Y"))? true : false;
			}
			if (intent.getStringExtra("zoomMode") != null) {
				zoomMode = (intent.getStringExtra("zoomMode").equals("Y"))? true : false;
			}

			if(intent.getStringExtra("maxCount") != null){
				String _maxcount  = intent.getStringExtra("maxCount");
				try {
					maxCount = Integer.parseInt(_maxcount);
				} catch (Exception e) {
					// TODO: handle exception
				}

			}

			String mediaType = intent.getStringExtra("mediaType");
			if (mediaType != null) {
				if (mediaType.equals("single_image")) {
					singleMode = true;
					imageMode = true;
				}
				else if (mediaType.equals("multi_image")) {
					singleMode = false;
					imageMode = true;
				}
				else if (mediaType.equals("single_video")) {
					singleMode = true;
					imageMode = false;
				}
				else {
					singleMode = false;
					imageMode = false;
				}
			}

		}
		findViewById(ID_BACK).setOnClickListener(view -> {
            JSONArray images = new JSONArray();
			Intent intent1 = new Intent();
			intent1.putExtra("images", images.toString());
			setResult(RESULT_OK, intent1);
			finish();
		});

		if(Build.VERSION.SDK_INT >= 34) {
			// 매회 해당 권한 요청 후 선택된 이미지에 대하여ImageList1Activity로 출력
			// 사진 및 동영상 선택 권한(READ_MEDIA_VISUAL_USER_SELECTED)은 권한요청(requestPermissions)으로 OS에서 권한을 허용할 이미지를 선택할 수 있는 이미지 선택상자가 활성화되며 요청하지 않으면 선택대화상자가 활성화되지 않음
			// "사진 및 동영상 선택" 권한으로 선택할 때마다 권한을 허용할 이미지를 선택하도록 요청해야 하기 때문에 계속적인 권한확인 절차가 필요함.
			String[] mediaPermissions = new String[]{"android.permission.READ_MEDIA_VISUAL_USER_SELECTED","android.permission.READ_MEDIA_IMAGES","android.permission.READ_MEDIA_VIDEO"};
			PermissionUtil.checkPermissions(this, mediaPermissions, PermissionUtil.REQUEST_PERMISSION_STATE);
		}else{
			SetImageAdapter();
		}
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                    backCallback
            );
        }else {
            this.getOnBackPressedDispatcher().addCallback(this, callback);
        }
	}

	@Override
	public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
		super.onRequestPermissionsResult(requestCode, permissions, grantResults);
		Log.e("onRequestResult", String.valueOf(PermissionUtil.REQUEST_PERMISSION_STATE));
		if (requestCode == PermissionUtil.REQUEST_PERMISSION_STATE) {
			SetImageAdapter();
		}
	}

	public void SetImageAdapter(){
		if (imageMode) {
			mImageList = getImage();
		} else {
			mImageList = getVideo();
		}
		System.out.println(mImageList.size());
		mImageLoader = new ImageLoader(this);

		GridView gridView = (GridView) findViewById(ID_LIST);
		//gridView.setNumColumns(3);
		gridView.setAdapter(new MyAdapter(this));
		gridView.setOnItemClickListener(this);
	}

	private class MyAdapter extends BaseAdapter {
		private LayoutInflater inflater;

		public MyAdapter(Context context) {
			inflater = LayoutInflater.from(context);
		}

		@Override
		public int getCount() {
			return mImageList.size();
		}

		@Override
		public Object getItem(int i) {
			return mImageList.get(i);
		}

		@Override
		public long getItemId(int i) {
			return i;
		}

		@Override
		public View getView(int position, View view, ViewGroup viewGroup) {
			View v = view;
			ViewHolder holder;

			if (v == null) {
				int gridview_item = Utils.getDynamicID(mcontext,"layout","gridview_item");
				int picture = Utils.getDynamicID(mcontext,"id","picture");
				int text = Utils.getDynamicID(mcontext,"id","text");
				v = inflater.inflate(gridview_item, viewGroup, false);
				holder = new ViewHolder();
				holder.picture = (ImageView) v.findViewById(picture);
				holder.name = (TextView) v.findViewById(text);
			}
			else {
				holder = (ViewHolder) v.getTag();
			}

			Dir item = (Dir) getItem(position);
			holder.arrays = item.mArray;
			v.setTag(holder);

			final Bitmap bitmap = getBitmapFromMemCache(item.mArray.get(0)[Dir.PATH]);
			if (bitmap != null) {
				holder.picture.setImageBitmap(bitmap);
			}
			else {
				if (imageMode) {
					new ImageDownloaderTask(holder.picture).execute(item.mArray.get(0)[Dir.PATH]);
				}
				/*else {
				Bitmap bitmap = ThumbnailUtils.createVideoThumbnail(item.mArray.get(0)[Dir.PATH], Thumbnails.MINI_KIND);
				holder.picture.setImageBitmap(bitmap);
			}*/
				else {
					new ImageDownloaderTask(holder.picture).execute(item.mArray.get(0)[Dir.ID]);
				}
			}

			holder.name.setText(String.format("%s \n%d item(s)", item.mDirName, item.mArray.size()));

			return v;
		}
	}

	@SuppressLint("NewApi")
	public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
		if (getBitmapFromMemCache(key) == null) {
			mMemoryCache.put(key, bitmap);
		}
	}

	@SuppressLint("NewApi")
	public Bitmap getBitmapFromMemCache(String key) {
		return mMemoryCache.get(key);
	}

	static class ViewHolder {
		ImageView picture;
		TextView name;
		ArrayList<String[]> arrays;
	}

	class ImageDownloaderTask extends AsyncTask<String, Void, Bitmap> {
		private final WeakReference<ImageView> imageViewReference;

		public ImageDownloaderTask(ImageView imageView) {
			imageViewReference = new WeakReference<ImageView>(imageView);
		}

		@Override
		protected Bitmap doInBackground(String... params) {
			if (imageMode) {
				Bitmap bitmap = null;
				for(int i = 0; i< params.length; i++) {
					try {

						BitmapFactory.Options option = new BitmapFactory.Options();
						option.inJustDecodeBounds = true;
						String imagePath = params[i];
						//option.inSampleSize = 3;
						BitmapFactory.decodeFile(imagePath, option);
						option.inSampleSize = ImageList2Activity.calculateInSampleSize(option, 200, 200);
						option.inJustDecodeBounds = false;

/*			    			if(imagePath.toLowerCase().endsWith("jpg") ||imagePath.toLowerCase().endsWith("jpeg")) {
			    				bitmap = mImageLoader.GetRotatedBitmap(BitmapFactory.decodeFile(imagePath, option), mImageLoader.GetExifOrientation(imagePath));
			    			}else {
			    				bitmap = mImageLoader.GetRotatedBitmap(BitmapFactory.decodeFile(imagePath, option), 0);
			    			}*/
						bitmap = BitmapFactory.decodeFile(imagePath, option);
						if(imagePath != null && bitmap != null){
							addBitmapToMemoryCache(String.valueOf(imagePath), bitmap);
						}
						break;
					} catch (Exception e) {
						// TODO: handle exception
					}
				}
				return bitmap;

			}
			else {
				ContentResolver crThumb = ImageList1Activity.this.getContentResolver();
				BitmapFactory.Options opt=new BitmapFactory.Options();
				opt.inSampleSize = 1;
				int id = Integer.parseInt(params[0]);
				Bitmap bitmap = MediaStore.Video.Thumbnails.getThumbnail(crThumb, id, MediaStore.Video.Thumbnails.MICRO_KIND, opt);

				return bitmap;


	    		/*Bitmap bitmap = ThumbnailUtils.createVideoThumbnail(params[0], Thumbnails.MICRO_KIND);
	    		if(params[0] != null && bitmap != null){
			    	addBitmapToMemoryCache(String.valueOf(params[0]), bitmap);
			    }
				return bitmap;*/
			}
		}

		@Override
		protected void onPostExecute(Bitmap bitmap) {
			if (isCancelled()) {
				bitmap.recycle();
				bitmap = null;
			}

			if (imageViewReference != null) {
				ImageView imageView = imageViewReference.get();
				if (imageView != null) {
					if (bitmap != null) {
						imageView.setImageBitmap(bitmap);
					}
				}
			}
		}
	}

	@Override
	public void handlingError(String arg0, String arg1, String arg2,
							  String arg3, NetReqOptions arg4) {
		// TODO Auto-generated method stub

	}

	@Override
	public void requestData(String arg0, String arg1, DataHandler arg2,
							NetReqOptions arg3) {
		// TODO Auto-generated method stub

	}

	@Override
	public void responseData(int arg0, String arg1, String arg2, String arg3,
							 NetReqOptions arg4) {
		// TODO Auto-generated method stub

	}

	/**
	 * ID초기화
	 * @param context
	 */
	private void initID(Context context) {
		Resources res = context.getResources();
		LAYOUT_IMAGELIST = res.getIdentifier("activity_imagelist", "layout", context.getPackageName());
		ID_LIST = res.getIdentifier("gridview", "id", context.getPackageName());
		ID_BACK = res.getIdentifier("cancelBtn", "id", context.getPackageName());
	}

	/**
	 * 모든 이미지를 검색 하여 이미지가 포함된 경로별로 이미지를 구분하여 리스트 형태로 만들어 준다.
	 * @return
	 */
	private ArrayList<Dir> getImage() {
		ArrayList<Dir> array = new ArrayList<Dir>();
		if(TextUtils.isEmpty(mPath) == false){
			List<File> list = Utils.getListFiles(new File(mPath));
			int id = 0;
			for(File file : list){
				if (file.exists() && file.isFile() && file.getAbsolutePath().contains("photo") && file.length() > 0) {

					String dir = file.getAbsolutePath().substring(0, file.getAbsolutePath().lastIndexOf("/"));
					Dir folder = checkFolder(array, dir);
					int orientation = Utils.getImageExifOrientation(file.getAbsolutePath());
					Logger.e(file.getAbsolutePath());
					folder.mArray.add(new String[]{file.getAbsolutePath(), file.getName(), orientation+"", id+"", ""});
					id ++;
				}
			}

		}else{

			String[] proj = {
					MediaStore.Images.Media._ID,
					MediaStore.Images.Media.DATA,
					MediaStore.Images.Media.DISPLAY_NAME,
					MediaStore.Images.Media.ORIENTATION,
			};

			Cursor imageCursor = getContentResolver().query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
					proj, null, null
					, MediaStore.Images.Media.DATE_MODIFIED + " DESC"
							+ ", " + MediaStore.Images.Media.DATE_TAKEN + " DESC"
							+ ", " + MediaStore.Images.Media.DATE_ADDED + " DESC");

			if (imageCursor != null && imageCursor.moveToFirst()) {
				int id = 0;
				String path;
				String name;
				int orientation = 0;
				long duration = 0;

				do {
					id = imageCursor.getInt(0);
					path = imageCursor.getString(1);			// 파일의 경로가 나온다.
					name = imageCursor.getString(2);	// 파일 이름만 나온다.
					orientation = imageCursor.getInt(3);	// orientation

					try {
						File file = new File(path);
						if (name != null && file.exists()) {
							String dir = path.substring(0, path.lastIndexOf("/"));
							Dir folder = checkFolder(array, dir);
							Logger.e(path);
							folder.mArray.add(new String[]{path, name, orientation+"", id+"", duration+""});
						}

					} catch (Exception e) {
						// TODO: handle exception
						Logger.i("이미지 url 호출 에러 ");
					}
				} while (imageCursor.moveToNext());
			}
			if (imageCursor != null) {
				imageCursor.close();
			}
		}
		return array;
	}


	/**
	 * 모든 이미지를 검색 하여 이미지가 포함된 경로별로 이미지를 구분하여 리스트 형태로 만들어 준다.
	 * @return
	 */
	private ArrayList<Dir> getVideo() {
		ArrayList<Dir> array = new ArrayList<Dir>();
		if(TextUtils.isEmpty(mPath) == false){
			List<File> list = Utils.getListFiles(new File(mPath));
			int id = 0;
			for(File file : list){
				if (file.exists() && file.isFile() && file.getAbsolutePath().contains("video")) {
					String dir = file.getAbsolutePath().substring(0, file.getAbsolutePath().lastIndexOf("/"));
					Dir folder = checkFolder(array, dir);
					//int orientation = Utils.getImageExifOrientation(file.getAbsolutePath());

					MediaPlayer mp = MediaPlayer.create(this, Uri.parse(file.getAbsolutePath()));
					int duration = mp.getDuration();
					mp.release();
					folder.mArray.add(new String[]{file.getAbsolutePath(), file.getName(), 0+"", id+"", duration+""});
					id ++;
				}
			}

		}else{
			String[] proj = {
					MediaStore.Video.Media._ID,
					MediaStore.Images.Media.DATA,
					MediaStore.Video.Media.DISPLAY_NAME,
					MediaStore.Video.Media.DATE_MODIFIED,
					MediaStore.Video.Media.SIZE,
					MediaStore.Video.Media.DURATION };


			Cursor imageCursor = getContentResolver().query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
					proj, null, null, null);

			if (imageCursor != null && imageCursor.moveToLast()) {
				int id = 0;
				String path;
				String name;
				int orientation = 0;
				long duration = 0;

				do {
					id = imageCursor.getInt(0);
					path = imageCursor.getString(1);			// 파일의 경로가 나온다.
					name = imageCursor.getString(2);	// 파일 이름만 나온다.
					duration = imageCursor.getInt(5);	// orientation
					try {
						File file = new File(path);
						if (name != null && file.exists()) {
							String dir = path.substring(0, path.lastIndexOf("/"));
							Dir folder = checkFolder(array, dir);
							folder.mArray.add(new String[]{path, name, orientation+"", id+"", duration+""});
						}

					} catch (Exception e) {
						// TODO: handle exception
						Logger.i("이미지 url 호출 에러 ");
					}
				} while (imageCursor.moveToPrevious());
			}
			if (imageCursor != null) {
				imageCursor.close();
			}
		}

		return array;
	}

	/**
	 * 폴더별로 이미지를 리스트에 추가
	 * @param array
	 * @param path
	 * @return
	 */
	private Dir checkFolder(ArrayList<Dir> array, String path) {
		Dir dir = null;
		for (int i = 0; i < array.size(); i++) {
			if (array.get(i).mDirPath.contains(path)) {
				return dir = array.get(i);
			}
		}
		dir = new Dir();
		dir.mDirPath = path;
		dir.mDirName = path.substring(path.lastIndexOf("/")+1);
		array.add(dir);

		return dir;
	}

	/**
	 * Dir Class
	 *
	 * @author 성시종(<a mailto="sijong@uracle.co.kr">sijong@uracle.co.kr</a>)
	 * @version v 1.0.0
	 * @since Android 2.1 <br>
	 *        <DT><B>Date: </B>
	 *        <DD>2011.07</DD>
	 *        <DT><B>Company: </B>
	 *        <DD>Uracle Co., Ltd.</DD>
	 *
	 * 폴더별 이미지 리스트를 만든다.
	 *
	 * Copyright (c) 2001-2011 Uracle Co., Ltd.
	 * 166 Samseong-dong, Gangnam-gu, Seoul, 135-090, Korea All Rights Reserved.
	 */
	public class Dir {
		/** 파일의 PATH */
		static final int PATH = 0;
		/** 파일의 이름 */
		static final int NAME = 1;
		/** Orientation */
		static final int ORIENTATION = 2;
		static final int ID = 3;
		static final int DURATION = 4;
		String mDirName = new String();
		String mDirPath = new String();
		ArrayList<String[]> mArray = new ArrayList<String[]>();
	}

	@Override
	public void addClassId() {
		// TODO Auto-generated method stub

	}

	@Override
	public int getClassId() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getNextClassId() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void onRestoreActivity(Parameters parameters) {

	}

	@Override
	public void onFinishedCaptureView() {

	}

	@Override
	public void onApplicationWillTerminate() {

	}

	@Override
	public Parameters getParameters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
    	/*Parameters param = new Parameters();
    	param.putParam("dir", ((ViewHolder) view.getTag()).arrays);
    	param.putParam("detailMode", (detailMode)? "Y" : "N");
    	param.putParam("zoomMode", (zoomMode)? "Y" : "N");
    	System.out.println("onItemClick:: " + numColumn);
    	param.putParam("columns", ""+numColumn);
    	param.putParam("singleMode", (singleMode)? "Y" : "N");
    	param.putParam("imageMode", (imageMode)? "Y" : "N");*/
		//param.putParam("PARAMETERS", param.toString());
    	/*CommonLibHandler.getInstance().getController().actionMoveActivity(LibDefinitions.libactivities.ACTY_LISTIMAGE2,
							CommonLibUtil.getActionType(null),
		    				ImageList1Activity.this,
		    				null,
		    				param);*/

		Intent intent = new Intent(ImageList1Activity.this, ImageList2Activity.class);
		System.out.println("((ViewHolder) view.getTag()).arrays.size():: " + ((ViewHolder) view.getTag()).arrays.size());
//    	intent.putExtra("dir", ((ViewHolder) view.getTag()).arrays);
		mArrays =  ((ViewHolder) view.getTag()).arrays;
		intent.putExtra("detailMode", (detailMode)? "Y" : "N");
		intent.putExtra("zoomMode", (zoomMode)? "Y" : "N");
		intent.putExtra("columns", ""+numColumn);
		intent.putExtra("singleMode", (singleMode)? "Y" : "N");
		intent.putExtra("imageMode", (imageMode)? "Y" : "N");
		intent.putExtra("maxCount", String.valueOf(maxCount));

		mStartForResult.launch(intent);

	}

	public  static ArrayList<String[]> mArrays;

	public final ActivityResultLauncher<Intent> mStartForResult =
            registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                        setResult(RESULT_OK, result.getData());
                        finish();
                    }
                }
            });
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(backCallback);
        }
    }
}

