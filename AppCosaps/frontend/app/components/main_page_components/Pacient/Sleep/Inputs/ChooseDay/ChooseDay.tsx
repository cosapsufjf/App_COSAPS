  import { Calendar } from "react-native-calendars";
  import BB from "@/app/components/crud_components/big_button/BB";
  import { Colors } from "@/app/MainStyle";
  import { View, Dimensions } from "react-native";

  interface props {
    setShowSelectedDay: (show: boolean) => void;
    setSelectedDay: (day: any) => void;
    selectedDay: any;
  }
  
  const ChooseDay = ({ setShowSelectedDay, setSelectedDay, selectedDay }: props) => {
    return (
      <View>
        <Calendar
          onDayPress={(day) => setSelectedDay(day)}
          markedDates={{
            [selectedDay?.dateString]: {
              selected: true,
              selectedColor: Colors.Cor_2,
            },
          }}
        />
        <BB
          action={() => setShowSelectedDay(false)}
          text="Voltar"
          width={Dimensions.get("window").width * 0.8}
        />
      </View>
    );
  };

  export default ChooseDay;