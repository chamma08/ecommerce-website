import Layout from '@/components/Layout';
import ContentForm from '@/components/ContentForm';

export default function NewContent() {
  return (
    <Layout>
      <h1 className="text-blue-900 mb-2 font-bold text-xl">New Content</h1>
      <ContentForm />
    </Layout>
  );
}