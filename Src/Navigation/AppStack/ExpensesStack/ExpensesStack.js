import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {
  AddExpBill,
  EditExpenseDetails,
  Expense,
  ExpenseDetails,
  ExpenseList,
  ModalScreen,
} from "../../..";

const Stack = createStackNavigator();

const ExpensesStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        animationEnabled={true}
        initialRouteName="TripExpenses"
      >
        <Stack.Screen name="TripExpenses" component={Expense} options={{}} />
        <Stack.Screen name="AddExpBill" component={AddExpBill} />
        <Stack.Screen name="ExpenseList" component={ExpenseList} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
        <Stack.Screen
          name="EditExpenseDetails"
          component={EditExpenseDetails}
        />

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="MyModal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

export default ExpensesStack;
