import { useEffect, useState } from 'react';
import { getPostList } from '../api';
import PostListItem from '../components/PostListItem';
import { IResponsePostList, TAG } from '../api/types';
import NoPostList from '../components/NoPostList';
import Post from './Post.tsx';
import useGetPostList from '../queries/useGetPostList.ts';

const list = [
  {
    post: {
      id: 1,
      title: '1번 게시글',
      contents: '내용',
      tag: TAG.REACT,
    },
  },
  {
    post: {
      id: 2,
      title: '2번 게시글',
      contents: '내용',
      tag: TAG.REACT,
    },
  },
  {
    post: {
      id: 3,
      title: '3번 게시글',
      contents: '내용',
      tag: TAG.REACT,
    },
  },
];

const Home = () => {
  // return <div>{/*todo (3-1) post 목록 작성*/}</div>;
  // const [postList, setPostList] = useState<IResponsePostList>([]);
  const { data: postList = [], isError, isLoading } = useGetPostList();

  // const fetchPostList = async () => {
  //   const { data } = await getPostList();
  //   const sortedList = data.sort((a, b) => {
  //     if (a.id >= b.id) return -1;
  //     else return 1;
  //   });
  //   // setPostList(data);
  //   setPostList(sortedList);
  // };
  //
  // useEffect(() => {
  //   fetchPostList();
  // }, []);

  if (isLoading) {
    return <div>...불러오는 중...</div>;
  }

  if (postList.length === 0 || isError) {
    return <NoPostList />;
  }

  return (
    <div>
      {postList.map(item => (
        // <PostListItem key={item.id} id={`${item.id}`} title={item.title} contents={item.contents} tag={item.tag} />
        <PostListItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Home;
