import React, { useState } from "react";
import SeatsLayout from "@mindinventory/react-native-bus-seat-layout";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ADDSeatList } from "../store/system/ApiAction";

const BusSeat = ({ layout, gender, hideModal, getChairNo }) => {
  const seatList = useSelector((state) => state.system.seatList);
  const genderLabel = gender === 2 ? "booked" : "women";
  const dispatch = useDispatch();

  function dual(sayi) {
    // 2 ye bölümünden kalan 0 ise çift sayıdır
    return sayi % 2 === 0;
  }

  const confrm = (seats) => {
    // seçilen koltuklar
    console.log(seats);

    if (seats.length > 0) {
      // seçilen koltuk varsa
      const isDual = dual(seats[0].seatNo);
      if (isDual) {
        // seçilen koltuk çift ise
        const isSeatList = seatList.find(
          // seçilen koltuk numarasından bir önceki koltuk numarasını bul
          (seat) => seat.seatNumber === seats[0].seatNo - 1
        );
        // seçilen koltuk numarasından bir önceki koltuk numarası yok ise
        if (isSeatList == null) {
          dispatch(
            ADDSeatList({ seatNumber: seats[0].seatNo, seatType: genderLabel })
          );
          getChairNo(seats[0].seatNo);
          hideModal();
        } else {
          if (genderLabel == isSeatList?.seatType) {
            // seçilen koltuk numarasından bir önceki koltuk numarasının cinsiyeti ile seçilen koltuk numarasının cinsiyeti aynı ise
            dispatch(
              ADDSeatList({
                seatNumber: seats[0].seatNo,
                seatType: genderLabel,
              })
            );
            getChairNo(seats[0].seatNo);
            hideModal();
          } else {
            Alert.alert("Uyarı", "Bu koltuk numarasını seçemezsiniz!");
          }
        }
      } else {
        // seçilen koltuk tek ise
        const isSeatList = seatList.find(
          // seçilen koltuk numarasından bir sonraki koltuk numarasını bul
          (seat) => seat.seatNumber === seats[0].seatNo + 1
        );
        // seçilen koltuk numarasından bir sonraki koltuk numarası yok ise
        if (isSeatList == null) {
          getChairNo(seats[0].seatNo);
          hideModal();
        } else {
          if (genderLabel == isSeatList?.seatType) {
            // seçilen koltuk numarasından bir sonraki koltuk numarasının cinsiyeti ile seçilen koltuk numarasının cinsiyeti aynı ise
            getChairNo(seats[0].seatNo);
            hideModal();
          } else {
            Alert.alert("Uyarı", "Bu koltuk numarasını seçemezsiniz!");
          }
        }
      }
    }
  };
  return (
    <SafeAreaView>
      <SeatsLayout
        row={13}
        driverPosition="left"
        maxSeatToSelect={1}
        layout={
          layout
            ? { columnOne: 2, columnTwo: 2 }
            : { columnOne: 2, columnTwo: 1 }
        }
        isSleeperLayout={true}
        selectedSeats={seatList}
        numberTextStyle={styles.numberStyle}
        getBookedSeats={(seats) => confrm(seats)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  numberStyle: { fontSize: 12 },
});

export default BusSeat;
