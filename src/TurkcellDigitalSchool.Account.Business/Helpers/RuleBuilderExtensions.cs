using System;
using System.Collections.Generic;
using FluentValidation;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public static class RuleBuilderExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder,AppSetting appSettingPassRule)
        {
          //  var appSettingRepository = ServiceTool.ServiceProvider.GetService<IAppSettingRepository>();
            var passRule = "(?=.{1,20}$).*";
            var result = appSettingPassRule; // appSettingRepository.Get(w => w.Code == "PassRule");

            if (result != null && result.Value != null)
            {
                passRule = result.Value;
            }
            var lengths = passRule.getRegExRuleLengths();

            IRuleBuilder<T, string> options;
            if (lengths[0] == lengths[1])
            {
                options = ruleBuilder
                    .MinimumLength(int.Parse(lengths[0])).WithMessage(Messages.PassLength.Replace("#", lengths[0]))
                    .MaximumLength(int.Parse(lengths[1])).WithMessage(Messages.PassLength.Replace("#", lengths[1]));
            }
            else
            {
                options = (lengths[1] == "999") ?
                   (ruleBuilder
                   .MinimumLength(int.Parse(lengths[0])).WithMessage(Messages.PassLengthMin.Replace("#", lengths[0]))
                   .MaximumLength(int.Parse(lengths[1])).WithMessage(Messages.PassLengthMax.Replace("#", lengths[1]))) :
                   (ruleBuilder
                   .MinimumLength(int.Parse(lengths[0])).WithMessage(Messages.PassLengthMinMax.Replace("#1", lengths[0]).Replace("#2", lengths[1]))
                   .MaximumLength(int.Parse(lengths[1])).WithMessage(Messages.PassLengthMinMax.Replace("#1", lengths[0]).Replace("#2", lengths[1])));
            }

            ruleBuilder.AddRule(passRule, "[0", Messages.PassDigit);
            if (passRule.Replace(" ", "").Contains("!"))
            {
                ruleBuilder.Matches("[.,@#$&*!%_+]").WithMessage(Messages.PassSpecialCharacter);
            }
            ruleBuilder.AddRule(passRule, "[A", Messages.PassUppercaseLetter);
            ruleBuilder.AddRule(passRule, "[a", Messages.PassLowercaseLetter);

            return options;
        }

        public static void AddRule<T>(this IRuleBuilder<T, string> ruleBuilder, string passRule, string ruleText, string message)
        {
            if (passRule.Replace(" ", "").Contains(ruleText))
            {
                string rule = passRule.Substring(passRule.IndexOf(ruleText), passRule.IndexOf("]", passRule.IndexOf(ruleText)) - passRule.IndexOf(ruleText) + 1);
                ruleBuilder.Matches(rule).WithMessage(message);
            }
        }

        public static string[] getRegExRuleLengths(this string rule)
        {
            var lengths = rule.Replace(" ", "").Substring(rule.IndexOf('{') + 1, rule.IndexOf('}') - rule.IndexOf('{') - 1).Split(",");
            if (lengths[1] == "")
            {
                lengths[1] = "999";
            }
            return lengths;
        }
        public static void AddRuleMessage(this List<GetPasswordRulesQueryResultDto> messages, string[] array, string ruleText, string message)
        {
            string regExp = Array.Find<string>(array, w => w.Contains(ruleText));
            if (regExp != null)
            {
                messages.Add(new GetPasswordRulesQueryResultDto { Text = message, RegExp = ("(" + regExp + ")").Replace(".*)", ".*") });
            }
        }

        public static List<GetPasswordRulesQueryResultDto> GetPasswordRules(this string passRule)
        {
            var array = (")" + passRule.Replace(".*)", ".*") + "(").Split(")(");
            var lengths = passRule.getRegExRuleLengths();

            List<GetPasswordRulesQueryResultDto> list = new();
            if (lengths[0] == lengths[1])
            {
                list.Add(new GetPasswordRulesQueryResultDto { Text = Messages.PassLength.Replace("#", lengths[0]), RegExp = "(" + array[1] + ")" });
            }
            else
            {
                if (lengths[1] == "999")
                {
                    list.Add(new GetPasswordRulesQueryResultDto { Text = Messages.PassLengthMin.Replace("#", lengths[0]), RegExp = "(" + array[1] + ")" });
                }
                else
                {
                    list.Add(new GetPasswordRulesQueryResultDto { Text = Messages.PassLengthMinMax.Replace("#1", lengths[0]).Replace("#2", lengths[1]), RegExp = "(" + array[1] + ")" });
                }
            }

            AddRuleMessage(list, array, "[0", Messages.PassDigit);
            AddRuleMessage(list, array, "!", Messages.PassSpecialCharacter);
            AddRuleMessage(list, array, "[A", Messages.PassUppercaseLetter);
            AddRuleMessage(list, array, "[a", Messages.PassLowercaseLetter);

            return list;
        }
    }
}
