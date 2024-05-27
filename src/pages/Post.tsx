// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
// import { deletePostById, getPostById, getPostList } from '../api';
// import { IPost } from '../api/types';
import NotFound from '../components/NotFound';
import Tag from '../components/Tag';
import useGetPostById from '../queries/useGetPostById.ts';
import useDeletePostById from '../queries/useDeletePostById.ts';

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  color: #212529;
  margin-bottom: 2rem;
  word-break: keep-all;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -1.25rem;
`;

const TextButton = styled.button`
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  color: #868e96;
`;

const TagWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;
`;

const Info = styled.div`
  font-size: 1rem;
  color: #495057;
`;

const ContentsArea = styled.div`
  width: 768px;
  margin: 5rem auto 0px;
  font-size: 1.125rem;
  color: #212529;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Text = styled.p`
  width: 700px;
`;

const Post = () => {
  // todo (4) post 컴포넌트 작성
  // const navigate = useNavigate();
  const params = useParams();
  const { postId = '' } = params;
  const { data: post, isError, isLoading } = useGetPostById(postId);
  const { mutate: deletePost } = useDeletePostById();

  // 처음 진입할 때는 아무것도 없으니 null도 추가
  // const [post, setPost] = useState<IPost | null>(null);
  console.log(params, postId);

  // const fetchPostById = async (id: string) => {
  //   const { data } = await getPostById(id);
  //   setPost(data);
  // };
  // const requestDeletePostById = async () => {
  //   await deletePostById(postId);
  //   navigate('/');
  // };

  const clickDeleteButton = () => {
    const result = window.confirm('🤬🤬🤬🤬정말로 게시글을 삭제하시겠습니까????????????!!!!!');
    if (result) {
      // requestDeletePostById();
      deletePost({ postId });
    }
  };

  if (isLoading) {
    return <div>...불러오는 중...</div>;
  }

  // useEffect(() => {
  //   if (postId) {
  //     fetchPostById(postId);
  //   }
  // }, []);

  if (!post || isError) {
    return <NotFound />;
  }

  return (
    <div style={{ margin: '5.5rem auto', width: '700px' }}>
      <div>
        <Title>{post?.title}</Title>
        <Toolbar>
          <Info>
            <div>n분전</div>
          </Info>
          <div>
            {/*todo 수정/삭제 버튼 작성*/}
            <Link to="/write" state={{ postId }}>
              <TextButton style={{ marginRight: 10 }}>수정</TextButton>
            </Link>
            <TextButton onClick={clickDeleteButton}>삭제</TextButton>
          </div>
        </Toolbar>
        {/* 물음표의 뜻 : 있을수도있고, 없을수도있는데, 있으면 그때 tag의 값을 가져와라 */}
        {post?.tag && (
          <TagWrapper>
            <Tag>#{post.tag}</Tag>
          </TagWrapper>
        )}
      </div>
      <ContentsArea>
        {post?.contents?.split('\n').map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </ContentsArea>
    </div>
  );
};

export default Post;
