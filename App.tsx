import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions, TextStyle, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

type TextAlignType = Exclude<TextStyle["textAlign"], undefined>;

const pages = [
  {
    id: "start",
    children: [
      {
        title: "UNIVERSIDAD",
        description: `Nombre Nombre Apellido Apellido           CI: 00.000.000`,
        position: "center" as TextAlignType,
      },
    ],
  },
  {
    id: "peru",
    children: [
      {
        title: "Simón Bolívar en Perú",
        position: "center" as TextAlignType,
      },
      {
        title: "Llegada a Perú (1823)",
        description:
          "Bolívar fue invitado por el Congreso peruano para ayudar en la lucha independentista.",
        position: "left" as TextAlignType,
      },
      {
        title: "Batalla de Junín (1824)",
        description: "Lideró una victoria clave contra los realistas en los Andes.",
        position: "right" as TextAlignType,
      },
      {
        title: "Batalla de Ayacucho (1824)",
        description:
          "Sucre, bajo las órdenes de Bolívar, ganó esta batalla decisiva que aseguró la independencia de Sudamérica.",
        position: "left" as TextAlignType,
      },
      {
        title: "Dictadura (1824-1826)",
        description: "Bolívar fue nombrado dictador de Perú y reorganizó el país para estabilizarlo.",
        position: "right" as TextAlignType,
      },
      {
        title: "Creación de Bolivia (1825)",
        description: "Impulsó la fundación de Bolivia, influyendo en la política regional.",
        position: "left" as TextAlignType,
      },
    ],
  },
  {
    id: "bolivia",
    children: [
      {
        title: "Simón Bolívar en Bolivia",
        position: "center" as TextAlignType,
      },
      {
        title: "Batalla de Ayacucho (1824)",
        description:
          "Aunque se libró en Perú, esta victoria preparó el camino para la independencia de Bolivia y otros países sudamericanos.",
        position: "right" as TextAlignType,
      },
      {
        title: "Liberación de Bolivia (1825)",
        description:
          "Bolívar lideró la campaña de independencia en la región, que culminó en la creación de Bolivia tras la victoria sobre los realistas.",
        position: "left" as TextAlignType,
      },
      {
        title: "Fundación de Bolivia (1825)",
        description:
          "Tras la independencia, Bolívar proclamó la República de Bolivia en agosto de 1825, en honor a su papel en la liberación.",
        position: "left" as TextAlignType,
      },
      {
        title: "Constitución de Bolivia (1826)",
        description:
          "Bolívar redactó una constitución que buscaba establecer un gobierno republicano y la unión de los pueblos liberados.",
        position: "right" as TextAlignType,
      },
      {
        title: "Influencia política (1826)",
        description:
          "Bolívar tuvo un impacto duradero en la política boliviana, promoviendo ideales de libertad y unidad en América del Sur.",
        position: "left" as TextAlignType,
      },
    ],
  },
  {
    id: "panama",
    children: [
      {
        title: "Simón Bolívar en Panamá",
        position: "center" as TextAlignType,
      },
      {
        title: "Convocatoria (1826)",
        description:
          "Simón Bolívar organizó el Congreso en Panamá con el objetivo de promover la unión y cooperación entre las naciones independientes de América Latina.",
        position: "left" as TextAlignType,
      },
      {
        title: "Participación internacional (1826)",
        description:
          "Delegados de varios países, incluyendo Colombia, Venezuela, Perú, México, y otros, asistieron al Congreso, buscando establecer lazos políticos y económicos.",
        position: "right" as TextAlignType,
      },
      {
        title: "Propuestas de unión (1826)",
        description:
          "Bolívar abogó por la creación de una confederación o unión de repúblicas latinoamericanas para enfrentar amenazas externas y fortalecer la independencia.",
        position: "left" as TextAlignType,
      },
      {
        title: "Desacuerdos y fracasos (1826)",
        description:
          "A pesar de las intenciones de Bolívar, surgieron desacuerdos entre las delegaciones, lo que dificultó la creación de un pacto duradero y efectivo.",
        position: "right" as TextAlignType,
      },
      {
        title: "Legado (1826)",
        description:
          "Aunque el Congreso no logró sus objetivos, sentó las bases para futuras discusiones sobre la integración latinoamericana y la cooperación regional.",
        position: "left" as TextAlignType,
      },
    ],
  },
];

const bgs = ["#A2D2DF", "#F6EFBD", "#C9E9D2", "#FFE3E3"];

const Square: React.FC<{ scrollY: Animated.Value }> = ({ scrollY }) => {
  const modulo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollY, height), new Animated.Value(height)),
    1
  );

  const rotate = modulo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  return (
    <Animated.View
      style={{
        height: height * 2,
        width: height * 2,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: -15,
        left: 0,
        transform: [
          {
            rotate,
          },
        ],
      }}
    />
  );
};

const Backdrop: React.FC<{ scrollY: Animated.Value }> = ({ scrollY }) => {
  const bg = scrollY.interpolate({
    inputRange: bgs.map((_, i) => i * height),
    outputRange: bgs.map((bg) => bg),
  });

  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: bg }]} />;
};

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Backdrop scrollY={scrollY} />
      <Square scrollY={scrollY} />
      <Animated.FlatList
        data={pages}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ item, index }) => {
          const opacity = scrollY.interpolate({
            inputRange: [(index - 1) * height, index * height, (index + 1) * height],
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          return (
            <View style={styles.item}>
              {item.children?.map((item) => (
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: 20,
                    marginVertical: 16,
                  }}
                >
                  <Animated.Text style={[styles.title, { textAlign: item.position, opacity }]}>
                    {item.title}
                  </Animated.Text>
                  {item.description && (
                    <Animated.Text style={[styles.description, { textAlign: item.position, opacity }]}>
                      {item.description}
                    </Animated.Text>
                  )}
                </View>
              ))}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  description: {
    fontSize: 19,
    color: "#333333",
  },
  item: {
    height,
    justifyContent: "center",
    alignItems: "center",
  },
});
