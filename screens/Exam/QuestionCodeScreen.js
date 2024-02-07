import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  Pressable,
  ToastAndroid,
} from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Question, Answer } from "../../src/models";
import { useRoute, useNavigation } from "@react-navigation/native";
import MathJax from "react-native-mathjax";

I18nManager.forceRTL(true);

const mmlOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/CommonHTML"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
    processEnvironments: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
    equationNumbers: {
      autoNumber: "AMS",
    },
    displayAlign: "right", // Align displayed equations to the right
    unicode: {
      fonts: "TeX", // Use TeX fonts for proper rendering of RTL text
    },
  },
  CommonHTML: {
    scale: 50, // Adjust the scale value as needed (85 corresponds to 85% of the default size)
    displayAlign: "right", // Align displayed equations to the right
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif", // Define the font for RTL text
  },
};

const QuestionCodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { grade, quizID,time } = route.params;
  const [questionCodes, setQuestionCodes] = useState([]);
  const [answerCodes, setAnswerCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examResult, setExamResult] = useState(0);
  const [timer , setTimer] = useState(time);
// timer bellow
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes}:${seconds}`;
  };
  const timeOutDescription = "زمان شما به پایان رسیده است. لطفاً دکمه 'نتیجه' را پیش از پایان زمان فشار دهید تا نتیجه آزمون نمایش داده شود."; 
   const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={timer} // Set the duration to 2 hours (7200 seconds)
      colors={['#053f65', '#F7B801', '#0003a3', '#A30000']}
      colorsTime={[7200, 3600, 1800, 0]}
      size={40} 
      strokeWidth={2} 
      onComplete={() => navigation.navigate("Result", {examResult : 0, timeOutDescription})}
    >
      {({ remainingTime }) => <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>}
    </CountdownCircleTimer>
  );
///////////////////////////

  const fetchAnswerCodes = async (questionID) => {
    try {
      const answers = await DataStore.query(Answer, Predicates.ALL, {
        questionID: questionID,
      });

      answers.sort((a, b) => {
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);

        return createdAtB - createdAtA;
      });

      return answers;
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      return [];
    }
  };

  useEffect(() => {
    const subscription = DataStore.observe(Answer).subscribe((msg) => {
      if (msg.model === Answer) {
        if (msg.opType === "INSERT") {
          setAnswerCodes((existingAnswer) => [...existingAnswer, msg.element]);
        } else if (msg.opType === "UPDATE") {
          setAnswerCodes((existingAnswer) => {
            const updatedAnswerIndex = existingAnswer.findIndex(
              (answer) => answer.id === msg.element.id
            );
            if (updatedAnswerIndex !== -1) {
              const updatedAnswer = {
                ...existingAnswer[updatedAnswerIndex],
                ...msg.element,
              };
              const updatedAnswers = [...existingAnswer];
              updatedAnswers[updatedAnswerIndex] = updatedAnswer;
              return updatedAnswers;
            }
            return existingAnswer;
          });
        } else if (msg.opType === "DELETE") {
          setAnswerCodes((existingAnswer) => {
            const deletedAnswerIndex = existingAnswer.findIndex(
              (answer) => answer.id === msg.element.id
            );
            if (deletedAnswerIndex !== -1) {
              const updatedAnswers = [...existingAnswer];
              updatedAnswers.splice(deletedAnswerIndex, 1);
              return updatedAnswers;
            }
            return existingAnswer;
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const questionCodesData = await DataStore.query(Question, (q) =>
        q.quizID.eq(quizID)
      );

      questionCodesData.sort((a, b) => {
        // Convert createdAt to the appropriate type if needed
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);

        // Compare the createdAt values
        return createdAtB - createdAtA;
      });
      setQuestionCodes(questionCodesData);

      const answerData = [];
      for (const questionCode of questionCodesData) {
        const answers = await fetchAnswerCodes(questionCode.id);
        answerData.push(...answers);
      }

      // Remove duplicate answer codes
      const uniqueAnswerCodes = answerData.filter(
        (answerCode, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.questionID === answerCode.questionID &&
              t.text === answerCode.text
          )
      );

      setAnswerCodes(uniqueAnswerCodes);
      setIsLoading(false);
    };

    fetchData();
  }, [quizID]);

  useEffect(() => {
    const subscription = DataStore.observe(Question).subscribe((msg) => {
      if (msg.model === Question) {
        if (msg.opType === "INSERT") {
          setQuestionCodes((existingquestion) => [
            ...existingquestion,
            msg.element,
          ]);
        } else if (msg.opType === "UPDATE") {
          setQuestionCodes((existingquestion) => {
            const updatedQuestionIndex = existingquestion.findIndex(
              (answer) => answer.id === msg.element.id
            );
            if (updatedQuestionIndex !== -1) {
              const updatedAnswer = {
                ...existingquestion[updatedQuestionIndex],
                ...msg.element,
              };
              const updatedAnswers = [...existingquestion];
              updatedAnswers[updatedQuestionIndex] = updatedAnswer;
              return updatedAnswers;
            }
            return existingquestion;
          });
        } else if (msg.opType === "DELETE") {
          setQuestionCodes((existingquestion) => {
            const deletedQuestionIndex = existingquestion.findIndex(
              (question) => question.id === msg.element.id
            );
            if (deletedQuestionIndex !== -1) {
              const updatedquestions = [...existingquestion];
              updatedquestions.splice(deletedQuestionIndex, 1);
              return updatedquestions;
            }
            return existingquestion;
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const AcceptedAnswerFunction = (answer, questionID) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionID]: answer,
    }));
  };

  useEffect(() => {
    let counter = 0;
    for (const questionCode of questionCodes) {
      const selectedAnswer = selectedAnswers[questionCode.id];
      const acceptedAnswer = questionCode.questionAcceptedAnswerId;
      if (selectedAnswer === acceptedAnswer) {
        counter++;
      }
    }
    const result = counter * grade;
    setExamResult(result);
  }, [selectedAnswers]);

  function containsMathNotation(text) {
    const mathRegex = /(\$.*?\$)/g;
    return mathRegex.test(text);
  }

  // ...

  return (<>
    <View style={styles.timerContainer}>
      <View style = {{flexDirection:"row",alignItems : "center"}}>
      <UrgeWithPleasureComponent />
      <Text style ={{fontSize : 10,marginRight:30, marginLeft: 5}}>
      لطفاً به مدیریت مناسب زمان خود بپردازید و قبل 
      از پایان زمان، دکمه نتیجه را فشار داده تا نتیجه خود را مشاهده کنید. در غیر اینصورت، نتیجه
       شما صفر خواهد بود. به طور خودکار به صفحه نتیجه هدایت خواهید شد.
      </Text>
      </View>
      </View>
    <ScrollView style={styles.container}>
      {questionCodes.map((questionCode, index) => (
        <View key={questionCode.id} style={styles.questionContainer}>
          <View>
            <Text style={styles.questionNumber}>
              {"("} {index + 1} {")"}
            </Text>
            {containsMathNotation(questionCode.text) ? (
              <MathJax
                html={`<Text style={[styles.question, styles.mathjax]}>  ${questionCode.text}    </Text>`}
                Options={mmlOptions}
              />
            ) : (
              <Text style={styles.question}>{questionCode.text}</Text>
            )}
          </View>
          <View style={styles.answerContainer}>
            {answerCodes
              .filter((answerCode) => answerCode.questionID === questionCode.id)
              .map((answerCode, index) => (
                <View key={answerCode.id} style={styles.answer}>
                  <Pressable
                    style={[
                      styles.rowContainer,
                      selectedAnswers[questionCode.id] === answerCode.id &&
                        styles.selectedAnswer,
                    ]}
                    onPress={() =>
                      AcceptedAnswerFunction(answerCode.id, questionCode.id)
                    }
                  >
                    {selectedAnswers[questionCode.id] === answerCode.id && (
                      <AntDesign name="select1" size={24} color="#1b3425" />
                    )}
                    <Text style={styles.optionNumber}>
                      {"("} {index + 1}
                    </Text>
                    <View style={styles.answerTextContainer}>
                      {containsMathNotation(answerCode.text) ? (
                        <MathJax
                          html={`<Text style={styles.myanswer}>${answerCode?.text}</Text>`}
                          mmlOptions={mmlOptions}
                          style={styles.answermathjax}
                        />
                      ) : (
                        <Text style={styles.answerText}>{answerCode.text}</Text>
                      )}
                    </View>
                  </Pressable>
                </View>
              ))}
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.resultButton}
        onPress={() => navigation.navigate("Result", { examResult })}
      >
        <Text style={styles.resultButtonText}>Result</Text>
      </TouchableOpacity>
    </ScrollView>
 </> );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,
    paddingTop: 2,
    marginTop: 30,
  },
  questionContainer: {
    marginBottom: 5,
    backgroundColor: "#ffffff",
    paddingHorizontal: 6,
    paddingVertical: 10,
    elevation: 1,
  },
  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 4,
    marginTop: 4,
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: "#f1f1f3",
    backgroundColor: "white",
    padding: 10,
  },
  question: {
    fontSize: 14,
    fontWeight: "200",
    textAlign: "left",
    marginBottom: 10,
    padding: 2,
  },
  answerTextContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  myanswer: {
    fontSize: 14,
    marginLeft: 1,
    fontStyle: "italic",
  },
  mathjax: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    fontSize: 5,
    padding: 8,
  },
  answerContainer: {
    marginTop: 2,
  },
  answer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    margin: 1,
  },
  answerText: {
    marginRight: 1,
  },
  resultButton: {
    backgroundColor: "#1a1a62",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 17,
    alignSelf: "center",
    margin: 10,
  },
  resultButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  optionNumber: {
    marginRight: 2,
    fontWeight: "bold",
  },
  questionNumber: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  answermathjax: {},
  selectedAnswer: {
    // Additional styles for selected answer
    backgroundColor: "lightgray",
    fontStyle: "italic",
    borderWidth: 2,
    borderColor: "#0f0f69",
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems : "flex-start",
    marginTop : 27,
    marginBottom  :-27,
    marginHorizontal : 5,
  },
  timerText: {
    fontSize: 9, // Adjust the font size as needed
  },
});
export default QuestionCodeScreen;
