import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext)

    const {loading, setLoading, post, setPost, feed, setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        // setFeed(data.posts.reverse())
        setFeed((data.posts || []).slice().reverse()) // safe
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    const handleLike = async (postId) => {
        
        const data = await likePost(postId)
        await handleGetFeed()
        setLoading(false)
    }
    const handleUnLike = async (postId) => {
        
        const data = await unLikePost(postId)
        await handleGetFeed()
        
    }

    useEffect(()=>{
        handleGetFeed()
    },[])

    return { loading, feed, post, handleGetFeed,handleCreatePost, handleLike, handleUnLike }
}

