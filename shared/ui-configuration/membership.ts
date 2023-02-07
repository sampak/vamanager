export interface MembershipUIConfiguration {
  canActive?: boolean;
  canDisable?: boolean;
  canChangeRole?: boolean;
  canResendInvite?: boolean;
}

export enum MembershipButtons {
  canActive = "canActive",
  canDisable = "canDisable",
  canChangeRole = "canChangeRole",
  canResendInvite = "canResendInvite",
}
