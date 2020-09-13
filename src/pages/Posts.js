import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Menu,
  Pagination,
  Segment,
  Header,
} from "semantic-ui-react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postsByUser, setPostsByUser] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [apiUrl, setApiUrl] = useState(
    "http://jsonplaceholder.typicode.com/posts?_page=0&"
  );

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setPosts(response.data);
    });
  }, [apiUrl]);

  useEffect(() => {
    axios
      .get(`http://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`)
      .then((posts) => {
        setPostsByUser(posts.data);
      });
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId) {
      axios
        .get(
          `http://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`
        )
        .then((posts) => {
          setPostComments(posts.data);
        });
    }
  }, [selectedPostId]);

  const onChangePagination = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setApiUrl(
      `http://jsonplaceholder.typicode.com/posts?_page=${pageInfo.activePage.toString()}`
    );
  };

  return (
    <Container>
      <Segment>
        <Header>Posts Table</Header>
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>UserId</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Body</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {posts &&
              posts.map((post, i) => (
                <Table.Row key={i}>
                  <Table.Cell onClick={() => setPostId(post.id)}>
                    {post.id}
                  </Table.Cell>
                  <Table.Cell onClick={() => setUserId(post.userId)}>
                    {post.userId}
                  </Table.Cell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.body}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Pagination
                    activePage={activePage}
                    totalPages={10}
                    onPageChange={onChangePagination}
                    ellipsisItem={null}
                  />
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
      {!!selectedPostId && postComments.length > 0 && (
        <Segment>
          <Header>Posts Id Table</Header>

          <Table
            celled
            headerRow={["Id", "User Id", "Title", "Body"]}
            renderBodyRow={({ id, userId, title, body }, i) => ({
              key: id || `row-${i}`,
              cells: [id, userId, title, body],
            })}
            tableData={postComments}
          />
        </Segment>
      )}
      {!!selectedUserId && postsByUser.length > 0 && (
        <Segment>
          <Header>User Id Table</Header>
          <Table
            celled
            headerRow={["Id", "User Id", "Title", "Body"]}
            renderBodyRow={({ id, userId, title, body }, i) => ({
              key: id || `row-${i}`,
              cells: [id, userId, title, body],
            })}
            tableData={postsByUser}
          />
        </Segment>
      )}
    </Container>
  );
};

export default Posts;
