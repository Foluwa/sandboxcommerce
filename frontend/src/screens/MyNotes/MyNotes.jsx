import React, { useEffect } from "react";

// Accordion, Badge, Button, Card, 
// import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import { deleteNoteAction, listNotes } from "../../actions/_notesActions";

import { Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { convertDate,capitalizeChar } from '../../helpers/utility';

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  // const noteList = useSelector((state) => state.noteList);
  // const { loading, error, notes } = noteList;

  const usersList = useSelector((state) => state.fetchUsers);
  // const { usersLoading, usersError, state } = usersList;
  const { loading, users, error } = usersList;
  console.log({ users });

  // console.log( { usersLoading, usersError, state });

  console.log({ usersList });

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const noteDelete = useSelector((state) => state.noteDelete);
  // const {
  //   // loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = noteDelete;

  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { success: successCreate } = noteCreate;

  // const noteUpdate = useSelector((state) => state.noteUpdate);
  // const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    // dispatch(listNotes());


    dispatch(fetchUsers());
    // fetchUsers();



    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    // successDelete,
    // successCreate,
    // successUpdate,
  ]);

  const deleteHandler = (id) => {
    // if (window.confirm("Are you sure?")) {
    //   dispatch(deleteNoteAction(id));
    // }
  };

  return (
    <MainScreen title={`Welcome ${userInfo && userInfo.name}..`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {/* {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )} */}


      {usersList.loading === true ? <Loading /> :
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {usersList.users && usersList.users.users.map((user, index) => {
              return (<tr key={user._id}><td>{index+1}</td><td>{capitalizeChar(user.name)}</td><td>{user.email}</td><td>{convertDate(user.createdAt)}</td></tr>)
            }
            )}
          </tbody>
        </Table>}



    </MainScreen>
  );
}

export default MyNotes;
