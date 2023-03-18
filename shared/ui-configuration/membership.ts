export interface MembershipUIConfiguration {
  canActive?: boolean;
  canDisable?: boolean;
  canChangeRole?: boolean;
  canResendInvite?: boolean;
  isDelayedPirepHeader?: boolean;
  noPirepsHeader?: boolean;
  scheduledPirepsHeader?: boolean;
}

export enum MembershipButtons {
  canActive = "canActive",
  canDisable = "canDisable",
  canChangeRole = "canChangeRole",
  canResendInvite = "canResendInvite",
  isDelayedPirepHeader = "isDelayedPirepHeader",
  noPirepsHeader = "noPirepsHeader",
  noScheduledPirepsHeader = "scheduledPirepsHeader",
}
