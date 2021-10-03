import Link from "next/link";
import TestLayout from "../../components/layouts/MainLayout";

interface IProps {}

const Blog: IProps = () => (
  <div>
    <TestLayout>Blog</TestLayout>
    <Link href="/blog/js">JS</Link>
  </div>
);

export default Blog;
