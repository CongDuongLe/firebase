import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '496627521930-m1m7e3598chng4201ie9sbmhd407bkr1.apps.googleusercontent.com',
});

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState();

    const googleSignIn = async () => {
        setLoading(true)
        const { idToken } = await GoogleSignin.signIn().catch((e) => {
          Alert.alert(e.message)
          setLoading(false)
        });
        // Create a Google credential with the token
        const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential)
          .then((res) => {
            setUserInfo(res);
            Alert.alert('UserData', JSON.stringify(res))
          }).catch((e) => {
            Alert.alert(e.message)
          });
        const accessToken = await (await GoogleSignin.getTokens()).accessToken;
        // console.log(res);
        console.log(accessToken);
        setLoading(false)
      }



  return (
    <TouchableOpacity style={{
        flex : 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        paddingHorizontal: 20,
    }} onPress={googleSignIn}>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        }}>
        Login with Google
        </Text>
        {loading ? <Text>Loading...</Text> : null}
        <GoogleSigninButton
        style={{ width: 192, height: 48, marginTop: 100 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
        disabled={loading}
      />

    </TouchableOpacity>
  )
}

export default Login

const styles = StyleSheet.create({})