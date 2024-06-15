import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Image, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function Home() {

    const [number, setNumber] = useState(10)
    const [newGeneratedPassword, setNewGeneratedPassword] = useState<string>('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isCopyTrue, setIsCopyTrue] = useState(false)

    const handleGeneratePassword = () => {
        const base = 'abcdefghijklmnopqrstuvwxyz1234567890'
        const baseLength = base.length
        let generatedPassword = ''

        for (let i = 0; i < number; i++) {
            generatedPassword += base.charAt(Math.floor(Math.random() * baseLength))
        }
        setNewGeneratedPassword(generatedPassword)
        setIsOpenModal(true)
    }

    const handleCopyPassword = async () => {
        setIsCopyTrue(true)
        await Clipboard.setStringAsync(newGeneratedPassword);
        setTimeout(() => {
            setIsCopyTrue(false)
        }, 2000)
    };

    return (
        <>
            <View className='h-full items-center justify-center gap-5 bg-gray-200' >
                <View >
                    <Image
                        className=''
                        source={require('../../assets/img.png')}
                    />
                </View>

                <View className='' >
                    <Text className='text-lg' >{number.toFixed(0)} characters</Text>
                </View>

                <View className='w-[80%] bg-white rounded-xl p-2' >
                    <Slider
                        minimumValue={6}
                        maximumValue={16}
                        value={number}
                        onValueChange={setNumber}
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="#ffff"
                    />
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.8} className='bg-blue-900 p-2 px-4 rounded-xl active:scale-[1.01]' onPress={handleGeneratePassword} ><Text className='text-lg text-white' >Generate password</Text></TouchableOpacity>
                </View>

                <Modal visible={isOpenModal} animationType='fade' transparent>
                    <View className='items-center justify-center h-full flex' style={styles.containerModal} >
                        <View className='bg-gray-200 w-5/6 rounded-xl p-10 space-y-5' >

                            <View>
                                <Text className='text-lg font-extrabold text-center' >Generat password</Text>
                            </View>

                            <View className='bg-black w-full p-2 rounded-xl' >
                                <Text className='text-lg font-extrabold text-center text-white' >{newGeneratedPassword.toLocaleUpperCase()}</Text>
                            </View>

                            <View className='flex-row justify-between w-full' >
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setIsOpenModal(false) }} className='w-2/4 p-3' ><Text className='text-center ' >Cancel</Text></TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={handleCopyPassword} className='w-2/4 p-3 bg-[#392DE9] rounded-lg' ><Text className='font-bold text-center text-white' >{isCopyTrue ? 'Copied' : 'Copy'}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})