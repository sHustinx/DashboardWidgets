import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, TableEmptyState, TableErrorState, TableAvatar, Label} from "monday-ui-react-core";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  const attentionBoxText = `Hello, your user_id is: ${
    context ? context.user.id : "still loading"
  }.
  Let's start building your amazing app, which will change the world!`;

  return (
    <div className="App">
      {/*<AttentionBox*/}
      {/*  title="Hello Monday Apps!"*/}
      {/*  text={attentionBoxText}*/}
      {/*  type="success"*/}
      {/*/>*/}
      <Table
          columns={[
            {
              id: 'sentOn',
              loadingStateType: 'medium-text',
              title: 'Sent on',
              width: 150
            },
            {
              id: 'subject',
              loadingStateType: 'long-text',
              title: 'Subject'
            },
            {
              id: 'sentBy',
              infoContent: 'This is the sender',
              loadingStateType: 'circle',
              title: 'Sent by',
              width: {
                max: 200,
                min: 120
              }
            },
            {
              id: 'status',
              infoContent: 'Info content for the status column',
              loadingStateType: 'medium-text',
              title: 'Status',
              width: 150
            },
            {
              id: 'emailsSent',
              loadingStateType: 'medium-text',
              title: 'Emails sent',
              width: 150
            }
          ]}
      >
        <TableHeader>
          <TableHeaderCell title="Sent on" />
          <TableHeaderCell title="Subject" />
          <TableHeaderCell title="Sent by" />
          <TableHeaderCell title="Status" />
          <TableHeaderCell title="Emails sent" />
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              Lorem ipsum dolor
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell>
              <Label
                  color="positive"
                  isAnimationDisabled
                  text="Sent"
              />
            </TableCell>
            <TableCell>
              100
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2023-03-03
            </TableCell>
            <TableCell>
              This is the subject This is the subject This is the subject This is the subject This is the subject This is the subject
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell>
              <Label
                  color="positive"
                  isAnimationDisabled
                  text="Sent"
              />
            </TableCell>
            <TableCell>
              999
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2022-02-02
            </TableCell>
            <TableCell>
              This is the subject
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell>
              <Label
                  color="positive"
                  isAnimationDisabled
                  text="Sent"
              />
            </TableCell>
            <TableCell>
              99
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
