import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { tableBackgroundColor, textColor } from '../global';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Card from './Card';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // State to track whether progress is completed
  const [isProgressCompleted, setIsProgressCompleted] = useState(false);

  useEffect(() => {
    // When the progress reaches 100%, set isProgressCompleted to true
    if (progress === 100) {
      setIsProgressCompleted(true);
    } else {
      setIsProgressCompleted(false);
    }
  }, [progress]);

  return (
    <View style={styles.container}>
         {isProgressCompleted ? (
        <Text style={styles.successText}>Downloaded!</Text>
      ) : (
        <Text style={styles.progressText}>{`${progress}%`}</Text>
      )}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
        <View style={styles.scrollBar} />
      </View>
    </View>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          setLoading(false);
          return prevProgress;
        }
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
          {!loading ? (
              <TouchableOpacity
                style={styles.icon}
                onPress={startLoading}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name="download-outline"
                  size={20}
                  color={textColor}
                />
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.icon} 
                    onPress={startLoading}
                    disabled={loading}
                >
              <Feather
                name="loader"
                size={20}
                color={textColor}
              />
              </TouchableOpacity>
            )}
            <Text style={styles.introTitle}>{loading ? 'Loading' : 'Download'}</Text>
            </View>
          <ProgressBar progress={progress} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  }, 
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: tableBackgroundColor,
    alignContent: 'center',
    marginTop: 5,
    padding: 0,
    width: 160,
    height: 50,
  },
  introTitle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: 120
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'gray'
  },
  progressBar: {
    height: 15,
    backgroundColor: '#ccc',
    position: 'relative',
    borderRadius: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#848484',
    position: 'absolute',
    borderRadius: 12,
  },
  scrollBar: {
    width: 3,
    height: '100%',
    position: 'absolute',
    right: 0,
  },
  progressText: {
    marginBottom: 10,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#848484',
  },
  successText: {
    marginBottom: 10,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#848484', 
  },
});

export default App;