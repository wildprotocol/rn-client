import { FC } from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Button, Screen, Text } from "@/components"
import { AuthStackScreenProps } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils"

import { useLogin } from "./hooks/useLogin"

interface LoginScreenProps extends AuthStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen() {
  const { themed } = useAppTheme()
  // Add this line to use the useLogin hook
  const { loginWithFarcaster } = useLogin()

  return (
    <Screen safeAreaEdges={["top", "bottom"]} contentContainerStyle={$root} preset="fixed">
      <Image
        source={require("../../../assets/images/app-icon-ios.png")}
        style={$logo}
        resizeMode="contain"
      />
      <View style={$titleContainer}>
        <Text style={themed($titleText)} text="Wildcard" />
        <View style={themed($titleSeparator)} />
        <View style={themed($titleSeparator)} />
        <View style={themed($titleSeparator)} />
      </View>

      <Text style={themed($subtitleText)} text="SocialFi Gone Wild" />

      <View style={$loginContainer}>
        <Text style={themed($loginMethodText)} text="Choose Login Method" />
        {/* @maxsorto - We can use the button component directly for these */}
        <Button
          text="Email"
          textStyle={themed($emailButtonText)}
          style={themed($emailButton)}
          onPress={() => {
            // TODO: Implement email login
          }}
        />
        <TouchableOpacity
          onPress={() => {
            // Call loginWithFarcaster when Warpcast button is pressed
            loginWithFarcaster({ relyingParty: "https://app.wildcard.lol" })
          }}
          style={$warpcastButton}
        >
          <Text style={themed($buttonText)} text="Warpcast" />
        </TouchableOpacity>

        <View style={$termsContainer}>
          <Text style={themed($termsText)} text="By signing in, you agree to our" />
          <View style={$termsLinksContainer}>
            <TouchableOpacity>
              <Text style={themed($termsLink)} text="Terms and Conditions" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={themed($termsLink)} text="Privacy Policy" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={themed($termsLink)} text="EULA" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
}

const $logo: ImageStyle = {
  height: 128,
  width: 128,
  marginBottom: 40,
}

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: 56,
  marginBottom: 10,
}

const $titleText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  flex: 1,
  fontSize: 48,
  lineHeight: 61,
  textAlign: "center",
  fontFamily: typography.secondary.normal,
  backgroundColor: colors.white,
  color: colors.black,
})

const $titleSeparator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 10,
  height: "100%",
  backgroundColor: colors.white,
  marginLeft: 8,
})

const $subtitleText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 24,
  lineHeight: 40,
  textAlign: "center",
  textTransform: "uppercase",
  fontFamily: typography.secondary.normal,
  backgroundColor: colors.white,
  color: colors.black,
  marginVertical: 10,
  paddingHorizontal: 10,
})

// const $activityIndicator: ViewStyle = {
//   paddingTop: 40,
// }

const $loginContainer: ViewStyle = {
  width: "100%",
  paddingHorizontal: 20,
  marginTop: 40,
}

const $loginMethodText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 20,
  marginBottom: 16,
  fontFamily: typography.secondary.normal,
  textAlign: "center",
  color: colors.white,
})

const $emailButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 12,
  borderRadius: 8,
  backgroundColor: colors.primary,
  marginBottom: 16,
})

const $emailButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.black,
})

const $warpcastButton: ViewStyle = {
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#472A91",
  marginBottom: 16,
}

const $buttonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  textAlign: "center",
  fontWeight: "bold",
  color: colors.text,
  fontFamily: typography.primary.medium,
})

const $termsContainer: ViewStyle = {
  marginTop: 16,
}

const $termsText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 14,
  textAlign: "center",
  fontFamily: typography.primary.normal,
  color: colors.textDim,
})

const $termsLinksContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 4,
}

const $termsLink: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 14,
  textAlign: "center",
  fontFamily: typography.primary.normal,
  color: colors.primary,
  textDecorationLine: "underline",
  marginHorizontal: 4,
})
