import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteContentPage() {
  const router = useRouter();
  const [contentInfo, setContentInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/contents?id=' + id).then(response => {
      setContentInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push('/contents');
  }

  async function deleteContent() {
    await axios.delete('/api/contents?id=' + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete &nbsp;&quot;{contentInfo?.title}&quot;?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteContent} className="btn-red">Yes</button>
        <button className="btn-default" onClick={goBack}>NO</button>
      </div>
    </Layout>
  );
}