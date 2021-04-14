import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hascamerapermissions:null,
            scanned:false,
            scanneddata:'',

        }    }
getcamerapermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hascamerapermissions:status==="granted",
        buttonstate:'clicked',
        scanned:false
    });
}
handleBarCodeScanned=async({type,data})=>{
    const {buttonstate}=this.state  
    if(buttonstate==="bookid"){
    this.setState({
        scanned:true,
        scannedbookid:data,
        buttonstate:'normal'
    });
}
else if(buttonstate==="studentid"){
    this.setState({
        scanned:true,
        scannedstudentid:data,
        buttonstate:'normal'
    });
}
}
    render(){
        const hascamerapermissions=this.state.hascamerapermissions;
        const scanned=this.state.scanned;
        const buttonstate=this.state.buttonstate;
        if(buttonstate==="clicked" && hascamerapermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if(buttonstate==="normal"){
            return(
            <View style={styles.container}>
                <View>
                    <Image source={require("../assets/booklogo.jpg")}
                    style={{width:200,height:200}}/>
                    <Text style={{textAlign:'center',fontSize:30}}>Wily</Text>
                </View>
                <View style={styles.inputview}>
                    <TextInput style={styles.inputbox}
                    placeholder="bookid"
                    value={this.state.scannedbookid/>
                        <TouchableOpacity 
                        style={styles.scanbutton}
                        onPress={()=>{
                            this.getcamerapermissions("bookid")
                        }}>
                            <Text style={styles.buttontext}>scan</Text>
                        </TouchableOpacity>

                </View>
                <View style={styles.inputview}>
                <TextInput style={styles.inputbox}
                placeholder="studentid"
                value={this.state.scannedstudentid/>
                    <TouchableOpacity 
                    style={styles.scanbutton}
                    onPress={()=>{
                        this.getcamerapermissions("studentid")
                    }}>
                        <Text style={styles.buttontext}>scan</Text>
                    </TouchableOpacity>

            </View>           
        
            </View>
        );
    }
}
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displaytext:{
        fontSize:15
    },
    scanbutton:{
        backgroundColor:'#2196F3',
        padding:10,
        margin:10
    },
    buttontext:{
        fontSize:15,
        textAlign:'center',
        marginTop:10
    },
    inputview:{flexDirection:'row',
margin:20},
inputbox:{
    width:200,
    height:40,
 borderWidth:1.5,
 borderRightWidth:0,
 fontsize:20
},
scanbutton:{
    backgroundColor:'#66bb6a',
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0
}
});