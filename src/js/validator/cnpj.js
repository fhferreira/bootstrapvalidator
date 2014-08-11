(function ($) {
    $.fn.bootstrapValidator.i18n.cnpj = $.extend($.fn.bootstrapValidator.i18n.cnpj || {}, {
        'default': 'Please enter a valid CNPJ number'
    });

    $.fn.bootstrapValidator.validators.cnpj = {
        /**
         * http://en.wikipedia.org/wiki/CNPJ
         * Validate an BR CNPJ(National Registry of Legal Entities or Cadastro Nacional de Pessoas Jurídicas) 
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Consist of key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function (validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            cnpj = value.replace(/[^\d]+/g, '');

            if (cnpj == '') return false;

            if (cnpj.length != 14)
                return false;

            // Remove invalids CNPJs 
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return false;

            // Validate verification digits
            length = cnpj.length - 2
            numbers = cnpj.substring(0, length);
            digits = cnpj.substring(length);
            sum = 0;
            pos = length - 7;
            for (i = length; i >= 1; i--) {
                sum += numbers.charAt(length - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result != digits.charAt(0))
                return false;

            length = length + 1;
            numbers = cnpj.substring(0, length);
            sum = 0;
            pos = length - 7;
            for (i = length; i >= 1; i--) {
                sum += numbers.charAt(length - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result != digits.charAt(1))
                return false;

            return true;
        }
    };
}(window.jQuery));
