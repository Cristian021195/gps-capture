export interface IBeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{
      outcome: string;
      platform: string;
    }>;
}