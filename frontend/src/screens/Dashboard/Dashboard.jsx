import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { convertDate,capitalizeChar } from '../../helpers/utility';

function MyNotes({ history }) {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.fetchUsers);
  const { loading, users, error } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {

    dispatch(fetchUsers());

    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  ]);


  return (
    <MainScreen title={`Welcome ${capitalizeChar(userInfo && userInfo.name)}..`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading === true ? <Loading /> :
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users && users.users.map((user, index) => {
              return (<tr key={user._id}><td>{index+1}</td><td>{capitalizeChar(user.name)}</td><td>{user.email}</td><td>{user.description}</td><td>{convertDate(user.createdAt)}</td></tr>)
            }
            )}
          </tbody>
        </Table>}
    </MainScreen>
  );
}

export default MyNotes;