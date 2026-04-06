//form
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Enhanced validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, _, and -";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced submission handler
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setSubmitSuccess(false);

      try {
        // Simulate API call - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Login successful:", { username, password });

        // Show success message
        setSubmitSuccess(true);
        Alert.alert("Success", `Welcome back, ${username}!`);

        // Reset form after delay
        setTimeout(() => {
          setUsername("");
          setPassword("");
          setErrors({});
          setSubmitSuccess(false);
        }, 2000);
      } catch (error) {
        Alert.alert("Error", "Login failed. Please try again.");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          {/* App Icon - Circle with initial */}
          <View style={[styles.iconContainer, styles.iconCircle]}>
            <Text style={styles.iconText}>📱</Text>
          </View>

          <Text style={styles.title}>Login</Text>

          {/* Username Input */}
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) {
                setErrors({ ...errors, username: "" });
              }
            }}
            editable={!isLoading}
            placeholderTextColor="#999"
          />
          {errors.username && (
            <Text style={styles.errorText}>⚠ {errors.username}</Text>
          )}

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors({ ...errors, password: "" });
              }
            }}
            secureTextEntry
            editable={!isLoading}
            placeholderTextColor="#999"
          />
          {errors.password && (
            <Text style={styles.errorText}>⚠ {errors.password}</Text>
          )}

          {/* Password Requirements Hint */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsText}>Password requirements:</Text>
            <Text style={styles.requirementItem}>• At least 6 characters</Text>
            <Text style={styles.requirementItem}>• One uppercase letter (A-Z)</Text>
            <Text style={styles.requirementItem}>• One lowercase letter (a-z)</Text>
            <Text style={styles.requirementItem}>• One number (0-9)</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
              submitSuccess && styles.submitButtonSuccess,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : submitSuccess ? (
              <Text style={styles.submitButtonText}>✓ Login Successful</Text>
            ) : (
              <Text style={styles.submitButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  iconText: {
    fontSize: 60,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1.5,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#ffe6e6",
  },
  errorText: {
    color: "#ff4444",
    marginBottom: 15,
    fontSize: 12,
    fontWeight: "500",
  },
  requirementsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftColor: "#4CAF50",
    borderLeftWidth: 3,
  },
  requirementsText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  requirementItem: {
    fontSize: 11,
    color: "#666",
    marginVertical: 2,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  submitButtonSuccess: {
    backgroundColor: "#4CAF50",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginForm;
