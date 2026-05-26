import { StyleSheet } from "react-native";
import { Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        backgroundColor: colors.Cor_6,
        borderRadius: "5%",
        padding:"5%"
    },

    txt: {
        fontSize: 22,
        fontWeight: "normal",
        color: "white",
    },
    list_item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 40,
        minHeight: 50,
        width: "95%",
        margin: 10,
        backgroundColor: colors.Cor_4,
        padding: 15
    },
    status_icon: {
        backgroundColor: "green",
        height: 25,
        width: 25,
        borderRadius: 50
    }
});

export default styles;
