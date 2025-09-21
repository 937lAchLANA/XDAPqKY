// 代码生成时间: 2025-09-21 22:48:06
import { Injectable } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common/interfaces';
import { TypeGraphQLModule } from 'type-graphql';
import { Theme } from './theme.entity';
import { ThemeService } from './theme.service';
import { ThemeResolver } from './theme.resolver';

// Define the ThemeSwitcher module
@Module({
  imports: [
    TypeGraphQLModule.forRoot<ApolloDriverConfig>(ApolloDriver),
  ],
  providers: [ThemeService, ThemeResolver],
  exports: [ThemeService],
})
export class ThemeSwitcherModule {}

/**
 * ThemeService class that manages theme switching.
 */
@Injectable()
export class ThemeService {
  private currentTheme: string;

  // Set the initial theme
  constructor() {
    this.currentTheme = 'light';
  }

  /**
   * Switch the current theme to the given theme.
   * @param theme The new theme to switch to.
   */
  switchTheme(theme: string): string {
    if (!['light', 'dark'].includes(theme)) {
      throw new Error('Invalid theme specified.');
    }
    this.currentTheme = theme;
    return `Theme switched to ${this.currentTheme}`;
  }
}

/**
 * ThemeResolver class that handles GraphQL queries and mutations related to theme switching.
 */
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * GraphQL mutation to switch the theme.
   * @param theme The new theme to switch to.
   * @returns A message indicating the new theme.
   */
  switchTheme(theme: string): string {
    return this.themeService.switchTheme(theme);
  }
}
