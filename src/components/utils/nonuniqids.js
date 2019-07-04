
export default function findDuplicates(data) {

            let result = [];
          
            data.forEach(function(element, index) {

              if (data.indexOf(element, index + 1) > -1) {
                
                // Find if the element is already in the result array or not
                if (result.indexOf(element) === -1) {
                  result.push(element);
                }
              }
            });
          
            return result;
          }