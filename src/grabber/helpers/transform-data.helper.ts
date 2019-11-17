import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { PostData } from '../interfaces/post-data.interface';
import { TransformedPostData } from '../interfaces/transformed-post-data.interface';

export const transformData = (
  html: string,
  data: PostData,
): TransformedPostData => {
  const $ = cheerio.load(html);
  const hiddenFields = $(`input[type=hidden]`)
    .toArray()
    .map(value => {
      return {
        name: $(value).attr('name'),
        value: $(value).val(),
      };
    });
  const additionalParams = _.chain(hiddenFields)
    .keyBy('name')
    .mapValues('value')
    .value();
  const fixedData = _.mapKeys(data, (value, key) => {
    // скорректированное имя инпута для текущего сайта
    // без этого фикса никакие POST-запросы не будут проходить
    const fixedDataField = $(`[name*="${key}"]`).attr('name');
    // console.log(key, value, fixedDataField);
    return fixedDataField;
  });
  const transformedData = _.merge(additionalParams, fixedData);
  console.log({ data, transformedData  })
  return transformedData as TransformedPostData;
};