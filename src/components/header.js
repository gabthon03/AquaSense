import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 20 },
  subtitle: { color: '#93C5FD', fontSize: 12, fontWeight: '700' },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
});