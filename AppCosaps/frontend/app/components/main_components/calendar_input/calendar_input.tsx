  import { Calendar } from "react-native-calendars";
  import BB from "@/app/components/main_components/big_button/BB";
  import { Colors } from "@/app/MainStyle";
  import { View, Dimensions } from "react-native";
  import type props  from "@/app/interfaces/calendar_input/calendar_input";

  const CalendarInput = ({ setShowSelectedDay, setSelectedDay, selectedDay }: props) => {
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

  export default CalendarInput;