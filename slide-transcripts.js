window.slideTranscripts = [
  {
    "number": 1,
    "title": "CHM 3120: Introduction to Analytical Chemistry",
    "text": "CHM 3120: Introduction to Analytical Chemistry\nUnit 2 - Section 3:\nStatistical Data\nTreatment and Evaluation\nChapter 5\nS UMM ER 2 0 2 6\nDR . ALI SH AFI EE\nali.shafiee@ufl.edu"
  },
  {
    "number": 2,
    "title": "Reliability of SD as a Measure of Precision",
    "text": "Reliability of SD as a Measure of Precision\nWe’ve learned that the standard deviation (SD) is a useful indicator of precision;\nbut how reliable is it in practice?\nWhat should we do when we encounter outliers, and how can we identify them?\nTo address these questions, we turn to statistical tests. These tools help us:\n• Test hypotheses,\n• Construct confidence intervals for our results, and\n• Detect and possibly reject outlying data points.\n2\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 3,
    "title": "Confidence Intervals",
    "text": "Confidence Intervals\nThe confidence interval for the mean is a range of values within which the true population\nmean (μ) is expected to fall, with a certain level of probability.\n• The boundaries of this range are called the confidence limits (CL).\n• CL is the probability that the interval actually contains the true mean; typically expressed as a\npercentage (e.g., 95%).\nFor a result x with standard deviation σ:\nμ = 𝑥 ± 1.64σ\nThis means that if we repeated the experiment many times,\nthen in 90 out of 100 cases, the true mean would lie within the\ninterval range.\n3\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 4,
    "title": "Confidence Intervals: T-test",
    "text": "Confidence Intervals: T-test\nlimitations in time or in the amount of available sample prevent us from making enough\nmeasurements to assume s is a good estimate of σ. Therefore, comparisons need to be done\nbetween different measurements.\nThis is done with the Student’s T-test and confidence intervals\n|𝑥 − 𝜇|\n𝑡 =\n𝑠\nൗ\n𝑁\n𝑡𝑠\nConfidence Interval = 𝑥 ±\n𝑁\n4\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 5,
    "title": "Standard Deviations and Confidence Intervals",
    "text": "Standard Deviations and Confidence Intervals\nData: 6.375, 6.372, 6.374, 6.377 , 6.375\n𝒙 = 𝟔. 𝟑𝟕𝟒𝟔 ± 𝟎. 𝟎𝟎𝟏𝟖\nN=5\n5\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 6,
    "title": "The Origin of the Student’s T-test",
    "text": "The Origin of the Student’s T-test\nWilliam Sealy Gosset\n1876 - 1937\n6\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 7,
    "title": "t vs t",
    "text": "t vs t\ncritical calc\nHow it works:\ndf 50% 80% 90% 95% 99% 99.9%\n1 1 3.078 6.314 12.71 63.66 636.62\n2 0.816 1.886 2.92 4.303 9.925 31.599 • Compute the t-value (t )\ncalc\n3 0.765 1.638 2.353 3.182 5.841 12.924\n4 0.741 1.533 2.132 2.776 4.604 8.61\n• Compare the t value to the t\n5 0.727 1.476 2.015 2.571 4.032 6.869 calc critical\n6 0.718 1.44 1.943 2.447 3.707 5.959\n(based on degrees of freedom and\n7 0.711 1.415 1.895 2.365 3.499 5.408\n8 0.706 1.397 1.86 2.306 3.355 5.041\n9 0.703 1.383 1.833 2.262 3.25 4.781 confidence level).\n10 0.7 1.372 1.812 2.228 3.169 4.587\n11 0.697 1.363 1.796 2.201 3.106 4.437\n12 0.695 1.356 1.782 2.179 3.055 4.318\nIf 𝑡 > 𝑡 :\n13 0.694 1.35 1.771 2.16 3.012 4.221\n𝑐𝑎𝑙𝑐 𝑐𝑟𝑖𝑡𝑐𝑎𝑙\n14 0.692 1.345 1.761 2.145 2.977 4.14\n15 0.691 1.341 1.753 2.131 2.947 4.073\n25 0.684 1.316 1.708 2.06 2.787 3.725 the difference is statistically\n60 0.679 1.296 1.671 2 2.66 3.46\n80 0.678 1.292 1.664 1.99 2.639 3.416\n100 0.677 1.29 1.66 1.984 2.626 3.39 significant\n1000 0.675 1.282 1.646 1.962 2.581 3.3\n7\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 8,
    "title": "Practice Problem",
    "text": "Practice Problem\nYou are verifying the label claim that an energy drink contains 100.0 mg of caffeine per can. To\ntest this, you analyze five independent samples and obtain the following results (in mg): 98.5,\n100.1, 99.7, 101.0, 99.9\nUsing these data, determine whether your experimental results are statistically consistent with\nthe manufacturer’s claim at the 95% confidence level.\n෍ 𝑥 = 499.2 𝑥 = 99.84 From t-table for df = 4, 95% confidence: 2.776\n𝑖\n(98.5 − 99.84)2 + 100.1 − 99.84 2 + ⋯ + (99.9 − 99.84)2\n𝑠 = = 0.8989 𝑚𝑔 = 0.899 𝑚𝑔\n5 − 1\n|99.84 − 100|\n𝑡 = = 0.3971 = 0.40\n0.899\nൗ\n5\nSince t = 0.40 < 2.776, the result is not significantly different from the claimed value.\ncalc\nConclusion: The label claim of 100.0 mg caffeine is statistically supported at the 95% confidence level.\n8\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 9,
    "title": "Practice Problem",
    "text": "Practice Problem\nThe carbohydrate content of a glycoprotein (a protein with sugars attached to it) is found to be\n12.6, 11.9, 13.0, 12.7 and 12.5 wt% (g carbohydrate/100 g glycoprotein) in replicate analyses.\nFind the 50% and 90% confidence intervals for the carbohydrate content.\n𝑥 = 12.54 From t-table for df = 4, 50% confidence: 0.741\n𝑠 = 0.40 wt%\nFrom t-table for df = 4, 90% confidence: 2.132\n0.741 × 0.40\n50% Confidence Interval = 12.54 ± = 12.54 ± 0.13 𝑤𝑡%\n5\n2.132 × 0.40\n90% Confidence Interval = 12.54 ± = 12.54 ± 0.38 𝑤𝑡%\n5\n9\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 10,
    "title": "Comparison of Means with Student’s t",
    "text": "Comparison of Means with Student’s t\nIf two sets of measurements are made for the same quantity, the calculated means will\nusually differ slightly because of random measurement variations.\nWe can use a t test to determine whether the observed difference between the two\nmean values is statistically significant at a chosen confidence interval (95% in\nmost cases).\nThe test evaluates whether the difference between the two means is larger than\nexpected from random measurement uncertainty (chance) alone.\nStatistics therefore provides the probability that the observed difference between two\nmeans arises only from random variation.\n10\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 11,
    "title": "Comparison of Means with Student’s t",
    "text": "Comparison of Means with Student’s t\nTwo data distributions:\nWe take N = 3 measurements\nSuppose two sets of measurements have\nfrom the second population\napproximately the same variability:\nand calculate a mean.\neach: mean= 200 ± 20\n200 340\nThe question is:\nIs the difference between the two means large enough that it is unlikely to be caused by random\nmeasurement uncertainty?\n• If the means are very close, the difference is likely due to random variation.\n• As the difference between the means increases, it becomes less likely that the two datasets come from the\nsame population.\nThe t-test evaluates this.\n11\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 12,
    "title": "Comparison of Means with Student’s t",
    "text": "Comparison of Means with Student’s t\nThe t statistic quantifies how large the difference is relative to\nthe experimental uncertainty.\n• Large t → the difference unlikely due to random error\n• Small t → the difference likely due to random error\nInterpretation (for 95% CI):\n200 340\n• If the p-value is larger than 0.05 (5%) → the difference can Mean of the second p-value (difference\nbe explained by random measurement uncertainty. dataset (right t due to random\ncalc\n• If the p-value is smaller than 0.05 (5%) → the difference is peak) error)\nstatistically significant, and the two datasets likely come 200 0.000 ~1.00\nfrom different populations.\n210 0.612 0.58\n220 1.225 0.29\nIn practice, we compare t with the critical value from the t\n230 1.837 0.14\ncalc\ntable (t ) for the chosen confidence level and degrees of\ncrit 240 2.449 0.07\nfreedom: if t > t , the difference is statistically significant.\ncalc crit\n250 3.062 0.037\n340 8.573 ~0\n12\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 13,
    "title": "Case 1: Comparing a Measurement with a Known Value",
    "text": "Case 1: Comparing a Measurement with a Known Value\n3 cases where we handle these comparisons slightly differently:\nCase 1: Comparing an Experimental Mean with a Known Value:\nMeasure a quantity several times, obtaining an average and std dev. We need to compare\nour measured value with an accepted (or known) value.\nDoes our measured result agree within experimental uncertainty?\n|𝑥 − 𝜇|\n𝑡 =\n𝑠\n𝑁\nThis is the case we have discussed so far.\nFor example, we can use this test to verify a label claim that an energy drink contains 100.0 mg of\ncaffeine per can, or to compare the sulfur content of a coal sample with the certified value from NIST.\n13\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 14,
    "title": "Case 1: Comparing a Measurement with a Known Value",
    "text": "Case 1: Comparing a Measurement with a Known Value\nPurchase a coal standard from NIST*: contains 3.19 wt% sulfur\nTesting a new method:\n3.29, 3.22, 3.30, 3.23 x ̄ = 3.26 s = 0.0408\nDoes our answer from the new method agree with the known answer?\n• Compute the 95% confidence interval and see if the range includes the\nknown answer\n• If the known answer is not within the 95% confidence interval, then the\nresults do not agree\n14\nCHM3120 | Ali Shafiee | UF *NIST: National Institute of Standards and Technology"
  },
  {
    "number": 15,
    "title": "Case 1: Comparing a Measurement with a Known Value",
    "text": "Case 1: Comparing a Measurement with a Known Value\n95% Confidence Interval of the Mean\n𝑡 = 3.182\n95%,3\n𝑡𝑠 3.182 × (0.0408)\nCI= 𝑥 ± = 3.26 ± 3.195 95% CI of the Mean\n3.325\n𝑁 4\n= 3.26 ± 0.065\nMEASUREMENT\nLower limit = 3.26 − 0.065 = 3.195\nUpper limit = 3.26 + 0.065 = 3.325\n3.20 3.30\n3.26\n|3.26 − 3.19|\n𝑡 = = 3.43\nMean\n0.0408\nൗ 3.19\n4\nTruth\nSince t > t , the difference is statistically\ncalc crit\nsignificant, meaning the new method likely\nhas systematic error (bias) relative to the\ncertified value.\n15\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 16,
    "title": "Case 2: Comparison of Two Experimental Means",
    "text": "Case 2: Comparison of Two Experimental Means\n3 cases where we handle these comparisons slightly differently:\nCase 2: Comparison of Two Experimental Means:\nMeasure a quantity several times by two different methods, getting unique means and\nstd dev Do the two results agree with each other within experimental uncertainty?\nBecause both methods measure the same quantity under similar conditions, we can\nassume that their measurement variability is assumed to be similar.\nInstead of treating the two SD separately, we combine them into a pooled SD(s ) which\npooled\ncombines the two standard deviations to give a better estimate of the common experimental\nuncertainty when comparing the two means.\n16\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 17,
    "title": "Case 2: Comparison of Two Experimental Means",
    "text": "Case 2: Comparison of Two Experimental Means\n3 cases where we handle these comparisons slightly differently:\nCase 2: Comparison of Two Experimental Means:\nMeasure a quantity several times by two different methods, getting unique means and\nstd dev Do the two results agree with each other within experimental uncertainty?\n𝑥 − 𝑥\n1 2\n𝑡 =\n𝑁 + 𝑁\n1 2\n𝑠\n𝑝𝑜𝑜𝑙𝑒𝑑 𝑁 𝑁\n1 2\n𝑁 2 𝑁 2 𝑁 2\nσ 1 𝑥 − 𝑥 + σ 2 𝑥 − 𝑥 + σ 3 𝑥 − 𝑥 + ⋯ 𝑠2 𝑁 − 1 + 𝑠2 𝑁 − 1\n𝑖=1 𝑖 1 1 𝑗=1 𝑗 2 2 𝑘=1 𝑘 3 3 1 1 2 2\n𝑅𝑒𝑐𝑎𝑙𝑙: 𝑠 = =\n𝑝𝑜𝑜𝑙𝑒𝑑\n𝑁 − 1 + 𝑁 − 1 + 𝑁 − 1 + ⋯ 𝑁 + 𝑁 − 2\n1 2 3 1 2\n17\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 18,
    "title": "Practice Problem",
    "text": "Practice Problem\nMeasuring bicarbonate (HCO -) in the blood of racehorses (banned substance). We’re\n3\ncertifying a new instrument: does the new instrument give the same results as the old\ninstrument?\nIs the standard deviation from the new instrument substantially different from that of the\noriginal instrument?\nOriginal Instrument New Instrument\nMean 36.14 36.20\nStd dev 0.28 0.47\n# measurements 10 4\n18\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 19,
    "title": "Practice Problem",
    "text": "Practice Problem\n0.0784 10 − 1 + 0.2209 4 − 1 1.3683\n𝑠 = = = 0.338\n𝑝𝑜𝑜𝑙𝑒𝑑\n10 + 4 − 2 12\n𝑥 − 𝑥 |36.14 − 36.20 | 0.06\n1 2\n𝑡 = = = = 0.300\n𝑁 + 𝑁 10 + 4 0.1998\n1 2\n𝑠 0.338 ×\n𝑝𝑜𝑜𝑙𝑒𝑑 𝑁 𝑁 10 × 4\n1 2\n𝑑𝑓: 𝑁 + 𝑁 − 2 = 10 + 4 − 2 = 12 → From t-table for df = 12, 95% confidence: 2.179\n1 2\n𝑡 = 0.300 < 𝑡 = 2.179\n𝑐𝑎𝑙𝑐 95%,12\nThere is no significant difference in the mean values between the two\ninstruments at the 95% confidence level\n19\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 20,
    "title": "Homework",
    "text": "Homework\nIn a forensic investigation, a glass containing red wine and an open bottle were analyzed for their\nalcohol content in order to determine whether the wine in the glass came from the bottle. On the\nbasis of six analyses, the average content of the wine from the glass was established to be 12.61%\nethanol. Four analyses of the wine from the bottle gave a mean of 12.53% alcohol. The 10 analyses\nyielded a pooled standard deviation s =0.070%. Do the data indicate a difference between the\npooled\nwines?\nAnswer check: No significant difference at the 95% confidence level\n20\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 21,
    "title": "Case 3: Comparing Individual Differences",
    "text": "Case 3: Comparing Individual Differences\n3 cases where we handle these comparisons slightly differently:\nCase 3: Comparing Individual Differences\nA sample is measured by two different methods. A different sample is then measured by\nthe same two methods. This is repeated for n different samples, producing pairs of\nmeasurements for each sample. Do the two methods agree within experimental\nuncertainty?\nBecause both methods are applied to the same sample, the results are paired.\nInstead of comparing the two means directly, we analyze the difference between the two\nmeasurements for each sample.\n21\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 22,
    "title": "Case 3: Comparing Individual Differences",
    "text": "Case 3: Comparing Individual Differences\nUse two methods to make single measurements on several different samples\n(no duplicate measurements). Do the 2 methods give the same answer within\nexperimental uncertainty?\nҧ 2\n𝑑 Σ 𝑑 − 𝑑 ҧ\n𝑖\n𝑠 =\n𝑡 = 𝑑\n𝑛 − 1\n𝑠\n𝑑\nd = Result − Result\ni (Method 2) (Method 1)\n𝑛 σ 𝑑\nҧ 𝑖\n𝑑 =\n𝑛\n• Be careful when calculating the differences:\nd = Result − Result\ni (Method 2) (Method 1)\n• Positive or negative values simply indicate which method gives the larger result.\n• The absolute value |d̄| is used in the t-equation.\n22\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 23,
    "title": "Practice Problem",
    "text": "Practice Problem\nA laboratory is evaluating a new, more economical Sample Method 1 (µg/L) Method 2 (µg/L)\nelectrochemical method for determining aluminum 1 17.2 14.2\n(Al) concentration in water samples to replace the 2 23.1 27.9\nexisting, more costly Atomic Absorption Spectroscopy 3 28.5 21.2\nmethod. To compare the methods, 11 water samples 4 15.3 15.9\nwere analyzed using each method.\n5 23.1 32.1\nDo the two methods give statistically equivalent\n6 32.5 22.0\nresults at the 95% confidence level?\n7 39.5 37.0\n8 38.7 41.5\n9 52.5 42.6\n10 42.6 42.8\n11 52.7 41.1\n23\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 24,
    "title": "Practice Problem",
    "text": "Practice Problem\nSample Method 1 Method 2 d = Method 2 − Method 1 d − d ത d − d ത 2\ni i i\n1 17.2 14.2 -3 -0.51 0.26\n2 23.1 27.9 4.8 7.29 53.16\n3 28.5 21.2 -7.3 -4.81 23.13\n4 15.3 15.9 0.6 3.09 9.55\n5 23.1 32.1 9 11.49 132.04\n6 32.5 22 -10.5 -8.01 64.15\n7 39.5 37 -2.5 -0.01 0.00\n8 38.7 41.5 2.8 5.29 27.99\n9 52.5 42.6 -9.9 -7.41 54.89\n2\nҧ\nΣ 𝑑 − 𝑑 455.388\n10 42.6 42.8 0.2 2.69 7.24 𝑖\n𝑠 = = = 6.748\n11 52.7 41.1 -11.6 -9.11 82.98 𝑑 𝑛 − 1 11 − 1\n𝑑 ҧ = -2.49 σ d − d ത 2 = 455.388\ni\nҧ\n𝑑 −2.49\n𝑡 = = = 1.224 𝑡 = 1.224 < 𝑡 = 2.228\n𝑠 6.748 𝑐𝑎𝑙𝑐 95%,10\n𝑑\n𝑛 11\nThere is no significant difference in the mean values between the\ntwo methods at the 95% confidence level\n24\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 25,
    "title": "Homework",
    "text": "Homework\nA new automated procedure for determining glucose in serum (Method A) is compared to the\nestablished method (Method B). Both methods are performed on serum from the same six patients\nin order to eliminate patient-to-patient variability. Do the following results confirm a difference in\nthe two methods at the 95% confidence level?\nMethod A glucose Method B glucose\nPatient\n(mg/L) (mg/L)\n1 1044 1028\n2 720 711\n3 845 820\n4 800 795\n5 957 935\n6 650 639\nAnswer check: The two methods are significantly different at the 95% confidence level. 25\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 26,
    "title": "Comparison of Variances: F-Test",
    "text": "Comparison of Variances: F-Test\nThe F-test is used to determine whether the variances (or standard deviations) of two\ndata sets are significantly different.\nThe variance (S2) reflects the precision of a measurement.\nTherefore, the F-test is commonly used to compare the precision of two sets of\nreplicate measurements or two analytical methods.\nExample uses:\n• Compare the precision of two analytical methods (e.g., UV-Vis vs ICP-OES for measuring Fe³⁺ concentration)\n• Evaluate measurement variability of an instrument (e.g., repeated GC measurements of caffeine in a sample)\n• Determine whether two analysts obtain similar precision (e.g., two students performing replicate titrations of\nacetic acid in vinegar)\n• Compare precision before and after instrument maintenance (e.g., HPLC retention time variability before and\nafter column replacement)\n26\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 27,
    "title": "F-Test",
    "text": "F-Test\nCritical Values of F at the 5% Significance Level (95% Confidence Level)\ndf for num→\n1 2 3 4 5 6 7 8 9 10 15 20 ∞\ndenom↓\nThe F test statistic is the ratio of the two\n1 161.4 199.5 215.7 224.6 230.2 234.0 236.8 238.9 240.5 241.9 245.9 248.0 254.3\n2 18.51 19.00 19.16 19.25 19.30 19.33 19.35 19.37 19.38 19.40 19.43 19.45 19.50\nsample variances: 3 10.13 9.552 9.277 9.117 9.013 8.941 8.887 8.845 8.812 8.786 8.703 8.660 8.526\n4 7.709 6.994 6.591 6.388 6.256 6.163 6.094 6.041 5.999 5.964 5.858 5.803 5.628\n5 6.608 5.786 5.409 5.192 5.050 4.950 4.876 4.818 4.722 4.753 4.619 4.558 4.365\n2\n𝑠 6 5.987 5.143 4.757 4.534 4.387 4.284 4.207 4.147 4.099 4.060 3.938 3.874 3.669\n𝑙𝑎𝑟𝑔𝑒𝑟\n7 5.591 4.737 4.347 4.120 3.972 3.866 3.787 3.726 3.677 3.637 3.511 3.445 3.230\n𝐹 =\n𝑐𝑎𝑙𝑐 8 5.318 4.459 4.066 3.838 3.687 3.581 3.500 3.438 3.388 3.347 3.218 3.150 2.928\n2\n𝑠\n9 5.117 4.256 3.863 3.633 3.482 3.374 3.293 3.230 3.179 3.137 3.006 2.936 2.707\n𝑠𝑚𝑎𝑙𝑙𝑒𝑟\n10 4.965 4.103 3.708 3.478 3.326 3.217 3.135 3.072 3.020 2.978 2.845 2.774 2.538\n11 4.844 3.982 3.587 3.257 3.204 3.095 3.012 2.948 2.896 2.854 2.719 2.646 2.404\n12 4.747 3.885 3.490 3.259 3.106 2.996 2.913 2.849 2.796 2.753 2.617 2.544 2.296\nThe larger variance is placed in the\n13 4.667 3.806 3.411 3.179 3.025 2.915 2.832 2.767 2.714 2.671 2.533 2.459 2.206\nnumerator so that F≥1.\n14 4.600 3.739 3.344 3.112 2.958 2.848 2.764 2.699 2.646 2.602 2.463 2.388 2.131\n15 4.534 3.682 3.287 3.056 2.901 2.790 2.707 2.641 2.588 2.544 2.403 2.328 2.066\nIf 𝐹 > 𝐹 : 16 4.494 3.634 3.239 3.007 2.852 2.741 2.657 2.591 2.538 2.494 2.352 2.276 2.010\n𝑐𝑎𝑙𝑐 𝑐𝑟𝑖𝑡𝑐𝑎𝑙\n17 4.451 3.592 3.197 2.965 2.810 2.699 2.614 2.548 2.494 2.450 2.308 2.230 1.960\nthe variances are significantly different\n18 4.414 3.555 3.160 2.928 2.773 2.661 2.577 2.510 2.456 2.412 2.269 2.191 1.917\n19 4.381 3.552 3.127 2.895 2.740 2.628 2.544 2.477 2.423 2.378 2.234 2.155 1.878\nat the 95% confidence level.\n20 4,351 3.493 3.098 2.866 2.711 2.599 2.514 2.447 2.393 2.348 2.203 2.124 1.843\n∞ 3.842 2.996 2.605 2.372 2.214 2.099 2.010 1.938 1.880 1.831 1.666 1.570 1.000\n27\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 28,
    "title": "Practice Problem",
    "text": "Practice Problem\nCritical Values of F at the 5% Significance Level (95% Confidence Level)\ndf for num→\n1 2 3 4 5 6 7 8 9 10 15 20 ∞\ndenom↓\nBack to our bicarbonate example… 1 161.4 199.5 215.7 224.6 230.2 234.0 236.8 238.9 240.5 241.9 245.9 248.0 254.3\n2 18.51 19.00 19.16 19.25 19.30 19.33 19.35 19.37 19.38 19.40 19.43 19.45 19.50\nInstrument SD Variance (s2) n\n3 10.13 9.552 9.277 9.117 9.013 8.941 8.887 8.845 8.812 8.786 8.703 8.660 8.526\nOriginal 0.28 0.0784 10 4 7.709 6.994 6.591 6.388 6.256 6.163 6.094 6.041 5.999 5.964 5.858 5.803 5.628\n5 6.608 5.786 5.409 5.192 5.050 4.950 4.876 4.818 4.722 4.753 4.619 4.558 4.365\nNew 0.47 0.2209 4\n6 5.987 5.143 4.757 4.534 4.387 4.284 4.207 4.147 4.099 4.060 3.938 3.874 3.669\n7 5.591 4.737 4.347 4.120 3.972 3.866 3.787 3.726 3.677 3.637 3.511 3.445 3.230\n8 5.318 4.459 4.066 3.838 3.687 3.581 3.500 3.438 3.388 3.347 3.218 3.150 2.928\n0.2209\n9 5.117 4.256 3.863 3.633 3.482 3.374 3.293 3.230 3.179 3.137 3.006 2.936 2.707\n𝐹 = = 2.817\n𝑐𝑎𝑙𝑐 10 4.965 4.103 3.708 3.478 3.326 3.217 3.135 3.072 3.020 2.978 2.845 2.774 2.538\n0.0784\n11 4.844 3.982 3.587 3.257 3.204 3.095 3.012 2.948 2.896 2.854 2.719 2.646 2.404\n12 4.747 3.885 3.490 3.259 3.106 2.996 2.913 2.849 2.796 2.753 2.617 2.544 2.296\n13 4.667 3.806 3.411 3.179 3.025 2.915 2.832 2.767 2.714 2.671 2.533 2.459 2.206\n𝐹 = 2.817 < 𝐹 = 3.863\n𝑐𝑎𝑙𝑐 𝑐𝑟𝑖𝑡𝑖𝑐𝑎𝑙\n14 4.600 3.739 3.344 3.112 2.958 2.848 2.764 2.699 2.646 2.602 2.463 2.388 2.131\n15 4.534 3.682 3.287 3.056 2.901 2.790 2.707 2.641 2.588 2.544 2.403 2.328 2.066\n16 4.494 3.634 3.239 3.007 2.852 2.741 2.657 2.591 2.538 2.494 2.352 2.276 2.010\nThere is no significant difference in variance 17 4.451 3.592 3.197 2.965 2.810 2.699 2.614 2.548 2.494 2.450 2.308 2.230 1.960\n18 4.414 3.555 3.160 2.928 2.773 2.661 2.577 2.510 2.456 2.412 2.269 2.191 1.917\nbetween the two instruments at the 95%\n19 4.381 3.552 3.127 2.895 2.740 2.628 2.544 2.477 2.423 2.378 2.234 2.155 1.878\nconfidence level\n20 4,351 3.493 3.098 2.866 2.711 2.599 2.514 2.447 2.393 2.348 2.203 2.124 1.843\n∞ 3.842 2.996 2.605 2.372 2.214 2.099 2.010 1.938 1.880 1.831 1.666 1.570 1.000\n28\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 29,
    "title": "Homework",
    "text": "Homework\nA standard method for the determination of the carbon monoxide (CO) level in gaseous mixtures is known\nfrom many hundreds of measurements to have a standard deviation of 0.21 ppm CO. A modification of the\nmethod yields a value for s of 0.15 ppm CO for a pooled data set with 12 degrees of freedom. A second\nmodification, also based on 12 degrees of freedom, has a standard deviation of 0.12 ppm CO.\nIs either modification significantly more precise than the original?\nAnswer check: Modification 1: No significant improvement\nModification 2: Significantly better precision 29\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 30,
    "title": "iClicker Attendance",
    "text": "iClicker Attendance\nA researcher compares a new glucose biosensor with a hospital Patient Reference Biosensor\nreference method using samples from the same 4 patients. 1 80 85\n2 120 125\nEven if both methods have similar variances, why is a paired t-test\n3 200 205\nconceptually better than an unpaired t-test?\n4 300 305\nA. An unpaired t-test requires at least 30 patients.\nB. The unpaired test compares overall group means, so the large patient-to-patient variability can\nhide the small systematic +5 mg/dL bias.\nC. Paired t-tests are only needed when two different instrumental techniques are compared.\nD. Unpaired t-tests assume there is no random error.\n30\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 31,
    "title": "iClicker Attendance",
    "text": "iClicker Attendance\nPatient Reference Biosensor\n1 80 85\n2 120 125\n3 200 205\n4 300 305\nWhat the unpaired test “sees” What the paired test “sees”\n• Reference: 80, 120, 200, 300 The paired test analyzes the differences:\n• Biosensor: 85, 125, 205, 305 d=Biosensor−Referenced\nBecause glucose levels vary a lot from patient to\nPatient Difference\npatient, both data sets look very spread out.\n1 +5\n2 +5\nCompared with that large spread, the consistent +5\n3 +5\nmg/dL difference between the two methods looks\n4 +5\nsmall, so an unpaired t-test may miss it.\nThe patient-to-patient variability cancels out,\nThe small +5 bias becomes hidden inside that spread. making the systematic bias obvious.\n31\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 32,
    "title": "iClicker Attendance",
    "text": "iClicker Attendance\nTwo analytical methods are compared.\n• Method A (very precise): 10.1, 9.9, 10.0, 10.1, 9.9; s = 0.1\nA\n• Method B (very noisy): 8.5, 11.5, 9.0, 12.0, 9.0; s = 1.7\nB\nWhy is it mathematically dangerous to skip the F-test and directly use a pooled t-test?\nA. The t-test cannot be calculated without first finding F\ncalc\nB. The F-test measures accuracy while the t-test measures precision.\nC. The F-test determines the degrees of freedom for paired t-tests.\nD. Pooling assumes both methods have similar variances. If one method is much noisier, the\nuncertainty estimate becomes distorted.\n32\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 33,
    "title": "iClicker Attendance",
    "text": "iClicker Attendance\nThe F-test checks whether the two methods have statistically similar variances. Using the given standard\ndeviations:\n2\nቀ1.70)\n2.89\n𝐹 = = = 289 → This is an enormous difference in variance.\n𝑐𝑎𝑙𝑐\n൫0.10)2 0.01\nThat means Method B is much noisier than Method A.\n2 2\n𝑠 𝑁 −1 +𝑠 𝑁 −1\nA pooled t-test combines both variances into one shared uncertainty estimate: 𝑠 = 1 1 2 2\npooled\n𝑁 +𝑁 −2\n1 2\nBut pooling assumes: 𝑠 ≈ 𝑠 which is clearly not true here.\n1 2\nAs a result, the noisy method artificially inflates the uncertainty estimate and can lead to misleading statistical\nconclusions.\n33\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 34,
    "title": "Rayleigh’s Nitrogen Measurements",
    "text": "Rayleigh’s Nitrogen Measurements\nIn the late 1800s, Lord Rayleigh carefully measured the density of nitrogen gas prepared by two\ndifferent methods.\n• Nitrogen obtained from air\n• Nitrogen produced chemically\n(This question led to the discovery of a new element: argon.)\n34\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 35,
    "title": "Rayleigh’s Nitrogen Measurements",
    "text": "Rayleigh’s Nitrogen Measurements\nRayleigh noticed a small but consistent difference in the measured masses.\nQuestion:\nIs the nitrogen obtained from air actually different from nitrogen\nproduced chemically, or is the difference due to random experimental error?\nNitrogen from\nNitrogen\nMeasurement # Chemical Reaction\nfrom Air (g)\n(g)\n1 2.31017 2.30143\n2 2.30986 2.29890\n3 2.31010 2.29816\n4 2.31001 2.30182\n5 2.31024 2.29869\n6 2.31010 2.29940\n7 2.31028 2.29849\n8 — 2.29889\nAverage 2.31011 2.29947\nStandard\nThis question led to the discovery of a new element: argon.\n0.000143 0.00138\ndeviation\n35\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 36,
    "title": "Interpreting Rayleigh’s Results",
    "text": "Interpreting Rayleigh’s Results\nNitrogen from\nNitrogen\nMeasurement # Chemical Reaction\nfrom Air (g)\nTwo statistical questions arise from these measurements.\n(g)\n1 2.31017 2.30143\n2 2.30986 2.29890\n1. Are the standard deviations significantly different?\n3 2.31010 2.29816\n→ Compare the precision using an F-test\n4 2.31001 2.30182\n5 2.31024 2.29869\n2. Are the average masses significantly different?\n6 2.31010 2.29940\n→ Compare the means using a t-test 7 2.31028 2.29849\n8 — 2.29889\nAverage 2.31011 2.29947\nRayleigh observed that nitrogen obtained from air was consistently slightly\nStandard\nheavier than nitrogen produced chemically. 0.000143 0.00138\ndeviation\nThis discrepancy eventually led to the discovery of argon in 1894, and contributed to Rayleigh\nreceiving the Nobel Prize in Physics in 1904 (Link).\n36\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 37,
    "title": "What About the Outlier?",
    "text": "What About the Outlier?\n• toWhat is bad data?\n• What exactly is an outlier?\n• Is it acceptable remove a data point?\nAn outlier is a data point that falls far from the other measurements.\nThe Q test and Grubbs test help determine whether a suspected\noutlier can be rejected.\nOutliers should only be removed if there is statistical or experimental justification.\n37\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 38,
    "title": "Q-Test for Detecting an Outlier",
    "text": "Q-Test for Detecting an Outlier\n𝑑 |𝑥 − 𝑥 | w: range of the\n𝑠𝑢𝑠𝑝𝑒𝑐𝑡𝑒𝑑 𝑛𝑒𝑎𝑟𝑒𝑠𝑡 𝑣𝑎𝑙𝑢𝑒\ndata set (max − min)\n𝑄 = =\n𝑤 𝑤\nCritical Values of the Q-Test for Detecting Outliers\nNumber of 90% 95% 99%\nobservations Confidence Confidence Confidence\n3 0.941 0.970 0.994\n4 0.765 0.829 0.926\n5 0.642 0.710 0.821\n6 0.560 0.625 0.740\nIf Q>Q ​, reject the suspected outlier.\ncrit 7 0.507 0.568 0.680\n8 0.468 0.526 0.634\n9 0.437 0.493 0.598\n10 0.412 0.466 0.568\n38\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 39,
    "title": "Grubbs Test for Detecting an Outlier",
    "text": "Grubbs Test for Detecting an Outlier\nPhotos from the UF\nCritical Values of the G-Test for Detecting Outliers\nChemistry Department\nhonoring Robert H. Grubbs, Number of G\na UF alumnus and Nobel\nobservations (95% confidence)\nLaureate.\n3 1.153\n4 1.463\n5 1.672\n6 1.822\n|𝑥 − 𝑥 |\n7 1.938\n𝑠𝑢𝑠𝑝𝑒𝑐𝑡𝑒𝑑\n𝐺 =\n𝑐𝑎𝑙𝑐 8 2.032\n𝑠\n9 2.110\n10 2.176\nIf G >G ​, the suspected value can be rejected, and the mean and standard\ncalc crit 11 2.234\ndeviation should be recalculated.\n12 2.285\n15 2.409\nCalculate s using the entire data set first, including the suspected value. 20 2.557\nOnly remove the value after the test confirms it is an outlier.\n30 2.745\n50 2.956\n39\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 40,
    "title": "One-Tailed vs. Two-Tailed Significance Tests",
    "text": "One-Tailed vs. Two-Tailed Significance Tests\nCould the data be significantly different in either direction from the\nexpected value?\nExample: Did this coal sample contain more sulfur than the limit,\nor less sulfur?\nSulfur in Coal\nExample\nSo, we split the “rejection area” (our 5% cutoff) into two tails:\n• 2.5% on the left (too low),\n• 2.5% on the right (too high)\nThe cutoff for significance ends up at t = 3.182 (for 3 degrees of\nfreedom in this example).\nThis is stricter because the 5% rejection region is split between\nboth tails.\nNote: In most analytical chemistry applications, two-tailed tests are typically used because deviations\ncan occur in either direction.\n40\nCHM3120 | Ali Shafiee | UF"
  },
  {
    "number": 41,
    "title": "One-Tailed vs. Two-Tailed Significance Tests",
    "text": "One-Tailed vs. Two-Tailed Significance Tests\nHere we ask only whether the value is greater than (or less than) the\nlimit.\nExample: Does the coal contain more sulfur than allowed by regulation?\nNow the entire 5% rejection region is in one tail.\nThat makes it “easier” to declare significance → cutoff is t = 2.353,\nsmaller than in the two-tailed case.\nIn a one-tailed test, all 5% goes into just one tail.\nSo instead of using a 95% two-tailed value, we use the 90% one-tailed\nvalue.\nUse the 90% t value for a one-tailed test.\nNote: One-tailed tests are used only when the\n𝑥ҧ − 𝑟𝑒𝑔𝑢𝑙𝑎𝑡𝑜𝑟𝑦 𝑙𝑖𝑚𝑖𝑡\n𝑡 = 𝑛\ndirection of the difference is specified in advance.\n𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑡𝑒𝑑\n𝑠\n41\nCHM3120 | Ali Shafiee | UF"
  }
];
