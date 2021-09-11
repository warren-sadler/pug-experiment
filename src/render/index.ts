import pug from "pug";
import * as path from "path";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */
const HERE = path.resolve(__dirname);
const TEMPLATES_BASE_DIR = path.resolve(HERE, "../templates");
const TEMPLATES = ["match", "prospecting", "recommendation"] as const;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Template = typeof TEMPLATES[number];
type Provider = Record<string, unknown>;
type Member = Record<string, unknown>;

interface MatchParams {
  title: string;
  provider: Provider;
  member: Member;
}

interface RecommendationParams {
  title: string;
  providers: Provider[];
  memberInsurance: string;
  memberState: string;
}

interface ProspectingParams {
  title: string;
  providerName: string;
  providerTitle: string;
  memberIssues: string[];
  memberInsurance: string;
  memberState: string;
}

type TemplateParamOptions = {
  match: MatchParams;
  prospecting: ProspectingParams;
  recommendation: RecommendationParams;
};

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/**
 *
 * @param template
 * @returns
 */
const getTemplatePath = (template: Template) =>
  path.join(TEMPLATES_BASE_DIR, `${template}.pug`);

/**
 *
 * @param template
 * @param params
 * @returns
 */
export function renderTemplate<T extends Template>(
  template: T,
  params: TemplateParamOptions[T]
): Promise<string> {
  return new Promise((res, rej) => {
    pug.renderFile(getTemplatePath(template), params, (err, html) => {
      err ? rej(err) : res(html);
    });
  });
}
