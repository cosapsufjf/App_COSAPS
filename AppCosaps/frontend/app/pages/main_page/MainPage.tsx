import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "./style";

import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import PacientArea from "@/app/components/main_page_components/Pacient/pacient_area/PacientArea";
import Line from "@/app/components/main_page_components/line/Line";
import PacientInfo from "@/app/components/main_page_components/Pacient/pacient_info/PacientInfo";
import Pacient_Overview from "@/app/components/main_page_components/Pacient/pacient_overview/Pacient_overview";

const MainPage : React.FC = ()=>{
    return(
        <SafeAreaProvider>
            <SafeAreaView edges={["top"]} style={styles.container}>
                <MainHeader/>
                <PacientArea/>
                <Line/>
                <Line/>

                <PacientInfo/>
                <Line/>
                <Line/>
                <Pacient_Overview/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MainPage;