import React from 'react';
import { useParams } from 'react-router-dom';

interface PageParams {
  pageId: string;
}

export const Page: React.FC = () => {
  const { pageId } = useParams<PageParams>();

  return <div>{pageId}</div>;
};
