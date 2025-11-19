import React, {useState} from 'react';
import {Pencil, Trash2} from 'lucide-react';
import ConfirmModal from '../common/ConfirmModal';

export default function CommentSection({
  comments,
  setComments,
  currentUserId,
  postId,
  onUpdateComment,
  onDeleteComment,
}) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  const handleSaveEdit = async (commentId) => {
    if (!postId || !onUpdateComment) return;

    try {
      const updatedComment = await onUpdateComment(commentId, postId, editedContent.trim());
      setComments((prevComments) => prevComments.map((c) => (c.commentId === commentId ? updatedComment : c)));
      handleCancelEdit();
    } catch (err) {
      console.error('댓글 수정 실패:', err);
      alert(err.message || '댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!onDeleteComment) return;

    try {
      await onDeleteComment(commentToDeleteId);
      setComments((prevComments) => prevComments.filter((c) => c.commentId !== commentToDeleteId));
      setCommentToDeleteId(null);
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
      alert(err.message || '댓글 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString('ko-KR');

  return (
    <>
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-bold">댓글 {comments.length}</h3>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.commentId}>
              {editingCommentId === comment.commentId ? ( // --- 수정 모드 UI ---
                <div className="space-y-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleSaveEdit(comment.commentId)}
                      className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      저장
                    </button>
                  </div>
                </div> // --- 일반 모드 UI ---
              ) : (
                <div className="flex items-start space-x-3">
                  <div className="flex-1 rounded-lg bg-gray-100 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{comment.userNickname}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
                  </div>
                  {/* --- 수정된 부분: currentUserId와 comment.userId 일치 여부에 따라 버튼 표시 --- */}
                  {comment.userId === currentUserId && (
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleStartEdit(comment)}
                        className="p-1 text-gray-400 hover:text-blue-500"
                        aria-label="댓글 수정"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setCommentToDeleteId(comment.commentId)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        aria-label="댓글 삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={commentToDeleteId !== null}
        onClose={() => setCommentToDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="댓글 삭제 확인"
        intent="destructive"
        confirmText="삭제"
      >
        정말로 이 댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </ConfirmModal>
    </>
  );
}
