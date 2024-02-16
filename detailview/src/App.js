import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
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
      <Table style={{
        width: "auto"
      }}
          columns={[
            {
              id: 'd-date',
              loadingStateType: 'medium-text',
              title: 'Date',
              width:120
            },
            {
              id: 'd-project',
              loadingStateType: 'short-text',
              title: 'Project',
              width:100
            },
            {
              id: 'd-decision',
              loadingStateType: 'medium-text',
              title: 'Decision'
            },
            {
              id: 'd-bias',
              loadingStateType: 'medium-text',
              title: 'Bias',
              width: 200
            },
            {
              id: 'd-reasoning',
              loadingStateType: 'medium-text',
              title: 'Reasoning',
              width: {
                max: 200,
                min: 120
              }
            },
            {
              id: 'd-outcome',
              loadingStateType: 'medium-text',
              title: 'Outcome',
              width: 150
            }
          ]}
      >
        <TableHeader>
          <TableHeaderCell title="Date" />
          <TableHeaderCell title="Project" />
          <TableHeaderCell title="Decision" />
          <TableHeaderCell title="Suspected Bias" />
          <TableHeaderCell title="Reasoning" />
          <TableHeaderCell title="Outcome" />
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              2020-01-01
            </TableCell>
            <TableCell>
              123a
            </TableCell>
            <TableCell>
              Continue project 137b
              Decided to continue 137b
              after a long delays (6 mo.+)
            </TableCell>
            <TableCell>
              sunk-cost fallacy,
              risk-seeking behaviour
            </TableCell>
            <TableCell>
              high previous
              financial- and time-related investments

            </TableCell>
            <TableCell>
              {/*<Label*/}
              {/*    color="negative"*/}
              {/*    isAnimationDisabled*/}
              {/*    text=""*/}
              {/*/>*/}
              negative
            </TableCell>
          </TableRow>cd
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
