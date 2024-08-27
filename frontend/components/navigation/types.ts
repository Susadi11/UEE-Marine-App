// components/navigation/types.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Define the stack param list for your navigation
export type RootStackParamList = {
  BlogPage: undefined;
  BlogDetail: { blogId: string };
};

// Define the type for navigation prop
export type BlogPageNavigationProp = StackNavigationProp<RootStackParamList, 'BlogPage'>;
