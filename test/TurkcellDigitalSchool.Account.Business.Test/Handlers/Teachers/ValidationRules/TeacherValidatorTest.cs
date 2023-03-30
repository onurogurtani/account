using FluentValidation.TestHelper;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.ValidationRules
{
    [TestFixture]
    public class TeacherValidatorTest
    {
        AddTeacherValidator _addTeacherValidator;
        UpdateTeacherValidator _updateTeacherValidator;

        [SetUp]
        public void Setup()
        {
            _addTeacherValidator = new AddTeacherValidator();
            _updateTeacherValidator = new UpdateTeacherValidator();
        }

        [Test]
        public void Validate_Add_Name_Is_Not_Null()
        {
            var item = new AddTeacherCommand {
                Name = null,
                CitizenId = 12345678966,
                Email = "email@hotmail.com",
                MobilePhones = "5554443322",
                SurName = "Surname"
            };

            var result = _addTeacherValidator.TestValidate(item);
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Validate_Add_Not_Null_All()
        {
            var item = new AddTeacherCommand
            {

            };

            var result = _addTeacherValidator.TestValidate(item);

            result.ShouldHaveValidationErrorFor(x => x.Name);
            result.ShouldHaveValidationErrorFor(x => x.SurName);
            result.ShouldHaveValidationErrorFor(x => x.CitizenId);
            result.ShouldHaveValidationErrorFor(x => x.Email);
            result.ShouldHaveValidationErrorFor(x => x.MobilePhones);
        }

        [Test]
        public void Validate_Edit_Name_Is_Not_Null()
        {
            var item = new UpdateTeacherCommand
            {
                Name = null,
                CitizenId = 12345678966,
                Email = "email@hotmail.com",
                MobilePhones = "5554443322",
                SurName = "Surname"
            };

            var result = _updateTeacherValidator.TestValidate(item);
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }


        [Test]
        public void Validate_Edit_Not_Null_All()
        {
            var item = new UpdateTeacherCommand
            {

            };

            var result = _updateTeacherValidator.TestValidate(item);

            result.ShouldHaveValidationErrorFor(x => x.Name);
            result.ShouldHaveValidationErrorFor(x => x.SurName);
            result.ShouldHaveValidationErrorFor(x => x.CitizenId);
            result.ShouldHaveValidationErrorFor(x => x.Email);
            result.ShouldHaveValidationErrorFor(x => x.MobilePhones);
        }

    }


}