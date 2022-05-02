import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { convertDate,capitalizeChar } from '../../helpers/utility';

const Dashboard = ({ history }) => {
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
    <MainScreen title={`Welcome ${userInfo && userInfo.name}..`}>
      <div className="container" style={{margin: '20px'}}>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading === true ? <Loading /> :
      <div class="table-responsive">
        <Table class="table">
          <thead class="thead-dark" >
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
        </Table>
        </div>
        }

      </div>
    </MainScreen>
  );
}

export default Dashboard;
