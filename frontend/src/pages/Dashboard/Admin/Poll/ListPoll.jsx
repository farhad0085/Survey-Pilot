import React from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import ListView from '../../../../components/ListView/ListView';

const ListPollPage = () => {

  const polls = [
    { id: 1, title: "Favorite programming language?", votes: 120, created_at: "2024-08-01", status: "Active" },
    { id: 2, title: "Preferred IDE?", votes: 95, created_at: "2024-07-25", status: "Closed" },
    { id: 3, title: "Best frontend framework?", votes: 150, created_at: "2024-08-10", status: "Active" },
  ];

  return (
    <DashboardLayout>
      <ListView
        data={polls}
        title={"Polls"}
        createLink={"/"}
        renderHeaderRow={() => (
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Votes</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        )}
        renderDataRow={item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.votes}</td>
            <td>{item.created_at}</td>
            <td>{item.status}</td>
          </tr>
        )}
      />
    </DashboardLayout>
  );
};

export default ListPollPage;
