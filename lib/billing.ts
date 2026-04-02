const FREE_DAILY_LIMIT = 50;
const PRO_DAILY_LIMIT = 100;
const PRO_MONTHLY_PRICE_USD = 10;

const ACTIVE_STATUSES = new Set(["active", "trialing", "on_trial", "past_due"]);

type SubscriptionShape = {
  subscription_status?: string | null;
  subscription_current_period_end?: Date | null;
};

export function hasActiveSubscription(
  user: SubscriptionShape | null | undefined,
) {
  if (!user?.subscription_status) {
    return false;
  }

  if (!ACTIVE_STATUSES.has(user.subscription_status)) {
    return false;
  }

  if (!user.subscription_current_period_end) {
    return true;
  }

  return user.subscription_current_period_end.getTime() > Date.now();
}

export function getDailyMessageLimit(
  user: SubscriptionShape | null | undefined,
) {
  return hasActiveSubscription(user) ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;
}

export function getBillingPlanLabel(
  user: SubscriptionShape | null | undefined,
) {
  return hasActiveSubscription(user) ? "Philosophy Pro" : "Starter";
}

export { FREE_DAILY_LIMIT, PRO_DAILY_LIMIT, PRO_MONTHLY_PRICE_USD };
