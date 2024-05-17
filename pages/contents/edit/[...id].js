import Layout from "@/components/Layout";
import ContentForm from "@/components/ContentForm"; // Assuming you have a ContentForm component
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditContentPage() {
    const [contentInfo, setContentInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/contents?id=' + id).then(response => {
            setContentInfo(response.data);
        });
    }, [id]);

    return (
        <Layout>
            <h1 className="text-blue-900 mb-2 font-bold text-xl">Edit Content</h1>
            {contentInfo && (
                <ContentForm {...contentInfo} />
            )}
        </Layout>
    );
}