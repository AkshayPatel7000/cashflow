import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  AddBill,
  AddDoc,
  AddDocFinish,
  AddDocOdometer,
  AddDocStart,
  AddFuelMeter,
  AddNote,
  AddSelfie,
  CancelTrip,
  EndDocCheck,
  EndFuel,
  EndOdometer,
  EndSelfie,
  FullScreenMap,
  MendatoryExp,
  StartDocCheck,
  StartFuel,
  StartOdometer,
  StartSelfie,
  StartTrip,
  Trip,
  TripDetailsScreen,
} from "../../..";

const Stack = createStackNavigator();

const TripStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        animationEnabled={true}
        initialRouteName="Trip"
      >
        <Stack.Screen name="Trip" component={Trip} />
        <Stack.Screen name="TripDetailsScreen" component={TripDetailsScreen} />
        <Stack.Screen name="AddDocOdometer" component={AddDocOdometer} />
        <Stack.Screen name="AddFuelMeter" component={AddFuelMeter} />
        <Stack.Screen name="AddSelfie" component={AddSelfie} />
        <Stack.Screen name="AddDoc" component={AddDoc} />
        <Stack.Screen name="AddDocStart" component={AddDocStart} />
        <Stack.Screen name="AddDocFinish" component={AddDocFinish} />
        <Stack.Screen name="StartTrip" component={StartTrip} />

        <Stack.Screen name="AddBill" component={AddBill} />
        <Stack.Screen name="CancelTrip" component={CancelTrip} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="MendatoryExp" component={MendatoryExp} />

        <Stack.Screen name="StartOdometer" component={StartOdometer} />
        <Stack.Screen name="StartFuel" component={StartFuel} />
        <Stack.Screen name="StartSelfie" component={StartSelfie} />
        <Stack.Screen name="StartDocCheck" component={StartDocCheck} />

        <Stack.Screen name="EndOdometer" component={EndOdometer} />
        <Stack.Screen name="EndFuel" component={EndFuel} />
        <Stack.Screen name="EndSelfie" component={EndSelfie} />
        <Stack.Screen name="EndDocCheck" component={EndDocCheck} />
        <Stack.Screen name="FullScreenMap" component={FullScreenMap} />
      </Stack.Navigator>
    </>
  );
};

export default TripStack;
