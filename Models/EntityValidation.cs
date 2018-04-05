using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UserApp.Models
{
    public class EntityValidation<T> where T : BaseEntity
    {
        public IEnumerable<ValidationResult> Validate(T entity)
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(entity, null, null);
            Validator.TryValidateObject(entity, validationContext, validationResults, true);
            return validationResults;
        }
    }

    public class EntityValidator
    {
        public static IEnumerable<ValidationResult> ValidateEntity<T>(T entity) where T : BaseEntity
        {
            return new EntityValidation<T>().Validate(entity);
        }
    }
}
