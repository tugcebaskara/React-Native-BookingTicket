import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DateTime = ({ value, onChange }) => {
  return <RNDateTimePicker value={value} mode="date" onChange={onChange} />;
};

export default DateTime;