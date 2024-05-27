import axios, { AxiosResponse } from 'axios';
import { IPost, IResponsePostList } from './types';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://34.64.90.89:8080/',
});

// todo (6) api 작성

export const getPostList = (): Promise<AxiosResponse<IResponsePostList>> => {
  // return null;
  return instance.get('/posts');
};

export const createPost = (title: string, contents: string, tag: string) => {
  // return null;

  // if (!title || !contents) return; -> 웬만하면 사용자에서부터 막는게 좋다

  return instance.post('/posts', {
    title,
    contents,
    tag,
  });
};

export const getPostById = (id: string): Promise<AxiosResponse<IPost>> => {
  // return null;
  return instance.get(`/posts/${id}`);
};

export const updatePostById = (id: string, title: string, contents: string, tag: string) => {
  // return null;
  return instance.put(`/posts/${id}`, {
    title,
    contents,
    tag,
  });
};

export const deletePostById = (id: string) => {
  // return null;
  return instance.delete(`/posts/${id}`);
};
