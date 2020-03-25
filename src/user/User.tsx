import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Pagination, Table } from "semantic-ui-react";
import Message from "./../message/Message";
import useGet from "./../http/useGet";

// The API returns snake case
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type Paginated<T> = {
  links: {
    base: string;
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  pagination: {
    offset: number;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  data: T[];
};

const User: React.FC = () => {
  const [page, setPage] = useState(1);
  const url = `/user?page=${page}&per_page=10`;
  let users: Paginated<User> = useGet(url);

  return (
    <div className="page">
      <Link to={`/user/add`}>
        <Button
          icon
          primary
          labelPosition="right"
          floated="right"
          className="add-button"
        >
          Add a User
          <Icon name="add" />
        </Button>
      </Link>

      <h1>Users</h1>
      <Message />
      {users && users.data && users.data.length && (
        <>
          <Table selectable striped className="sticky">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.data.map((user, key) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Link to={`/user/${user.id}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Link to={`/user/${user.id}`}>
                      <Icon name={"edit"} />
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Link to={`/user/${user.id}/delete`}>
                      <Icon name={"delete"} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Pagination
                    floated="right"
                    defaultActivePage={page}
                    totalPages={users.pagination.total_pages}
                    onPageChange={(eevent: any, data: any) =>
                      setPage(data.activePage)
                    }
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </>
      )}
    </div>
  );
};

export default User;
