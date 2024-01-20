import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Question, Answer } from "../../src/models";
import { useRoute, useNavigation } from "@react-navigation/native";
// npm install -g sharp-cli
// import MathJax from 'react-native-mathjax';
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
  const { grade, quizID } = route.params;
  const [questionCodes, setQuestionCodes] = useState([]);
  const [answerCodes, setAnswerCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examResult, setExamResult] = useState(0);

  const fetchAnswerCodes = async (questionID) => {
    try {
      const answers = await DataStore.query(Answer, Predicates.ALL, {
        questionID: questionID,
      });
      return answers;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const questionCodesData = await DataStore.query(Question, (q) =>
        q.quizID.eq(quizID)
      );
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

  return (
    <ScrollView style={styles.container}>
      {questionCodes.map((questionCode, index) => (
        <View key={questionCode.id} style={styles.questionContainer}>
        <View >
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
              .filter(
                (answerCode) => answerCode.questionID === questionCode.id
              )
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 1,
    paddingTop: 2,
    marginTop : 30,
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
    borderWidth : 2,
    borderColor : "#0f0f69"
  },
});
export default QuestionCodeScreen;
