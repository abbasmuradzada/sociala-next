import { EllipsisOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import { Avatar, Button, Card, Col, Divider, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { CommentService } from '../pages/_api/Comment';

interface Props {
    post: any;
}


const Comments = ({ post, setCommentCount }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        CommentService().getComments(post._id).then(({ data: { comments } }) => {
            setComments(comments)
        })
    }, [])

    useUpdateEffect(() => {
        setCommentCount(comments.length)
    }, [comments])

    const addComment = () => {
        if (comment.length > 0) {
            CommentService().addComment(post._id, {
                content: comment
            }).then(() => {
                setComment('');
                CommentService().getComments(post._id).then(({ data: { comments } }) => {
                    setComments(comments)
                })
            })
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Divider />
            </Col>

            <Col span={22}>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <Row justify='space-between'>
                        <Col span={20}>
                            <Input placeholder='Type your comment'
                                name='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Col>
                        <Col span={3}>
                            <Button onClick={addComment}>
                                Add comment
                            </Button>
                        </Col>
                    </Row>

                </form>
            </Col>

            <Col span={24}>
                {
                    comments && comments.map(comment =>
                        <Row style={{ marginTop: "10px" }}>
                            <Col span={2}>
                                <Avatar src={comment?.commentWriter.profilePicture} />
                            </Col>
                            <Col span={22}>
                                <Card style={{ borderRadius: '10px', background: '#F5F5F5' }}>
                                    <Row justify='space-between'>
                                        <Typography.Text style={{ fontWeight: 700 }} strong>
                                            {comment?.commentWriter.userName}
                                        </Typography.Text>
                                        <EllipsisOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                                    </Row>
                                    <Row>
                                        <Typography.Text style={{ color: '#ADB7BF', marginTop: "10px" }}>
                                            {comment?.content}
                                        </Typography.Text>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>)
                }
            </Col>
        </Row>

    )
}

export default Comments
