import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Comment {
  commentId: number
  postId: number
  userId: number
  name: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: number
  category: string
  category_name: string
  title: string
  content: string
  userId: number
  author_name: string 
  created_at: string
}

export interface Pagination {
  page: number
  size: number
  totalPage: number
  currentElements: number
  totalElements: number
}

const authFetch = (input: RequestInfo, init: RequestInit = {}) => {
  const token = localStorage.getItem("token")
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export const usePostStore = create(
  combine(
    {
      posts: [] as Post[],
      post: null as Post | null,
      pagination: null as Pagination | null,
      comments: [] as Comment[],
      comment: null as Comment | null,
      postId: null as number | null,
      loading: false
    },
    set => {
      return {
        setPosts(posts: Post[]) {
          set({ posts })
        },
        setPagination(pagination: Pagination) {
          set({ pagination });
        },
        setComments(comments: Comment[]) {
          set({ comments });
        },
        setPostId(postId: number) {
          set({ postId });
        },
    
        async searchPosts(category: string, page: number, size: number) {
          try {
            const res = await authFetch(`/api/v1/posts?category=${category}&page=${page}&size=${size}`)
        
            if (!res.ok) {
              const errorText = await res.text()
              alert(`게시글 목록 조회 실패: ${errorText || '서버 오류가 발생했습니다.'}`)
              return
            }
        
            const data = await res.json()
        
            // 🧩 userName을 authorName으로 매핑
            const normalizedPosts = data.content.map((post: any) => ({
              ...post,
              authorName: post.authorName || post.userName || '' // 우선순위 지정
            }))
        
            set({
              posts: normalizedPosts,
              pagination: {
                page: data.number,
                size: data.size,
                totalPage: data.totalPages,
                currentElements: data.numberOfElements,
                totalElements: data.totalElements
              }
            })
          } catch (error: any) {
            alert(`게시글 목록 불러오기 중 오류 발생: ${error.message || '네트워크 오류'}`)
          }
        },        
  
        async getPost(id: number): Promise<void> {
          set({ loading: true });

          try {
            const res = await authFetch(`/api/v1/posts/${id}`)
        
            if (!res.ok) {
              const errorText = await res.text()
              alert(`조회 실패: ${errorText || '서버 오류가 발생했습니다.'}`)
              return
            }
        
            const data = await res.json()
        
            const normalizedPost = {
              ...data,
              authorName: data.authorName || data.userName || '', // 여기 중요
            }
        
            console.log(normalizedPost.comments);

            set({ post: normalizedPost })
            set({ comments: normalizedPost.comments })
          } catch (error: any) {
            alert(`조회 중 오류 발생: ${error.message || '네트워크 오류'}`)
          } finally {
            set({ loading: false }); // 데이터 로딩 완료
          }
        },        

        async deletePost(id: number): Promise<boolean> {
          try {
            const res = await authFetch(`/api/v1/posts/${id}`, { method: 'DELETE' })

            if (!res.ok) {
              const errorText = await res.text()
              alert(`삭제 실패: ${errorText || '서버 오류가 발생했습니다.'}`)
              return false
            }

            set({ post: null })
            return true
          } catch (error: any) {
            alert(`삭제 중 오류 발생: ${error.message || '네트워크 오류'}`)
            return false
          }
        },

        async createPost(form: { title: string; content: string; category: string }): Promise<number | null> {
          try {
            const res = await authFetch('/api/v1/posts', {
              method: 'POST',
              body: JSON.stringify(form)
            })

            if (!res.ok) {
              const errorText = await res.text()
              alert(`등록 실패: ${errorText || '서버 오류가 발생했습니다.'}`)
              return null
            }

            const data = await res.json()
            set({ post: data })
            return data.id || null
          } catch (error: any) {
            alert(`등록 중 오류 발생: ${error.message || '네트워크 오류'}`)
            return null
          }
        },

        async updatePost(id: number, form: { title: string; content: string; category: string }): Promise<number | null> {
          try {
            const res = await authFetch(`/api/v1/posts/${id}`, {
              method: 'PATCH',
              body: JSON.stringify(form)
            })

            if (!res.ok) {
              const errorText = await res.text()
              alert(`수정 실패: ${errorText || '서버 오류가 발생했습니다.'}`)
              return null
            }

            const data = await res.json()
            set({ post: data })
            return data.id || null
          } catch (error: any) {
            alert(`수정 중 오류 발생: ${error.message || '네트워크 오류'}`)
            return null
          }
        },

        async createComment(id: number, content: string): Promise<number | null> {
          try {
            const res = await authFetch(`/api/v1/comments/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content }),
            });

            if (!res.ok) {
              const errorText = await res.text();
              alert(`댓글 등록 실패: ${errorText || '서버 오류가 발생했습니다.'}`);
              return null;
            }

            const data = await res.json();
            return data.commentId || null;
          } catch (error: any) {
            alert(`댓글 등록 중 오류 발생: ${error.message || '네트워크 오류'}`);
            return null;
          }
        },

        async deleteComment(commentId: number): Promise<boolean> {
          try {
            const res = await authFetch(`/api/v1/comments/${commentId}`, { method: 'DELETE' });

            if (!res.ok) {
              const errorText = await res.text();
              alert(`댓글 삭제 실패: ${errorText || '서버 오류가 발생했습니다.'}`);
              return false;
            }

            return true;
          } catch (error: any) {
            alert(`댓글 삭제 중 오류 발생: ${error.message || '네트워크 오류'}`);
            return false;
          }
        },

        async updateComment(commentId: number, content: string): Promise<boolean> {
          try {
            const res = await authFetch(`/api/v1/comments/${commentId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content }),
            });

            if (!res.ok) {
              const errorText = await res.text();
              alert(`댓글 수정 실패: ${errorText || '서버 오류가 발생했습니다.'}`);
              return false;
            }

            return true;
          } catch (error: any) {
            alert(`댓글 수정 중 오류 발생: ${error.message || '네트워크 오류'}`);
            return false;
          }
        }

      }
    }
  )
)