import datetime
import math
import time
from typing import List
from dateutil.relativedelta import relativedelta


class HelperMethods:
    @property
    def today(self) -> datetime.date:
        """Get today's date"""

        return datetime.date.today()

    @property
    def month_first_date(self) -> datetime.date:
        """Get current month's first day's date"""

        return self.today.replace(day=1)

    @property
    def week_first_date(self) -> datetime.date:
        """Get current week's first day's date"""

        start = self.today - datetime.timedelta(days=self.today.weekday())
        return start

    @property
    def yesterday(self) -> datetime.date:
        """Get yesterday's date"""

        return self.today - datetime.timedelta(days=1)

    @property
    def days_7_ago(self) -> datetime.date:
        """Get 7 days ago from today's date"""

        return self.days_n_ago(7)
    
    def get_last_day_of_month(self, date: datetime.date):
        # get close to the end of the month for any day, and add 4 days 'over'
        next_month = date.replace(day=28) + datetime.timedelta(days=4)
        # subtract the number of remaining 'overage' days to get last day of current month
        # or said programattically said, the previous day of the first of next month
        return next_month - datetime.timedelta(days=next_month.day)

    @property
    def previous_month_first_date(self) -> datetime.date:
        """Get last month's first day's date"""

        return self.previous_month_last_date.replace(day=1)

    @property
    def previous_month_last_date(self) -> datetime.date:
        """Get last month's last day's date"""

        return self.today.replace(day=1) - datetime.timedelta(days=1)

    @property
    def previous_week_first_date(self) -> datetime.date:
        """Get last week's first day's date"""

        return self.previous_week_last_date - datetime.timedelta(days=6)

    @property
    def previous_week_last_date(self) -> datetime.date:
        """Get last week last day's date"""

        return self.week_first_date - datetime.timedelta(days=1)

    @property
    def days_30_ago(self) -> datetime.date:
        """Get 30 days ago from today's date"""

        return self.days_n_ago(30)

    def days_n_ago(self, n) -> datetime.date:
        """Get n days ago's date"""

        return self.today - datetime.timedelta(days=n - 1)

    def stringify_date_range(self, start: datetime.date, end: datetime.date, format: str = "%d %b, %Y"):
        """Get string version for two dates"""
        
        start_date = start.strftime(format)
        end_date = end.strftime(format)
        return f"{start_date} - {end_date}"

    def _get_last_months(self, start_date, months):
        for i in range(months):
            yield start_date
            start_date += relativedelta(months = -1)

    def get_last_n_month(self, n):
        """
        Get last n month's dates
        Example: [
            [datetime.date(2023, 4, 1), datetime.date(2023, 4, 30)],
            [datetime.date(2023, 5, 1), datetime.date(2023, 5, 31)],
            [datetime.date(2023, 6, 1), datetime.date(2023, 6, 30)]
        ]
        """

        start_date = datetime.date.today().replace(day=1)
        return list(reversed([[i, i + relativedelta(months=1, days=-1)] for i in self._get_last_months(start_date, n)]))

    def get_months(self, start_date, end_date):
        """
        Get all months between two dates
        Example:
        Input:
        [2023-04-29, 2023-06-04]

        output: [
            ['2023-04-01', '2023-04-30'],
            ['2023-05-01', '2023-05-31'],
            ['2023-06-01', '2023-06-30'],
        ]
        """

        months = []
        current_month = start_date.replace(day=1)  # Set the day to the first day of the month
        while current_month <= end_date.replace(day=1):
            month_start = current_month
            month_end = current_month + relativedelta(months=1, days=-1)
            months.append([month_start, month_end])  # Convert dates to string format
            current_month = current_month + relativedelta(months=1)  # Move to the next month
        return months


    def get_quarters(self, start_date, end_date):
        """
        Get all quarters between two dates
        Example:
        Input: [2023-01-15, 2023-05-30]
        Output: [[2023-01-01, 2023-03-31], [2023-04-01, 2023-06-30]]
        """

        quarters = []
        current_date = start_date.replace(day=1)  # Set the day to the first day of the month
        while current_date <= end_date:
            quarter_start = current_date.replace(day=1)  # Set the day to the first day of the month
            quarter_end = quarter_start + relativedelta(months=3) - relativedelta(days=1)
            if quarter_end > end_date:
                if end_date.month % 3:
                    quarter_end = end_date + relativedelta(months=(3 - (end_date.month % 3)))
                else:
                    quarter_end = end_date
                quarter_end = (quarter_end + relativedelta(months=1)).replace(day=1) - relativedelta(days=1)
            quarters.append([quarter_start, quarter_end])
            current_date = quarter_start + relativedelta(months=3)  # Move to the next quarter
        return quarters


    @property
    def year_first_date(self) -> datetime.date:
        """Get current year's first day's date"""

        return self.today.replace(day=1, month=1)

    @property
    def last_year_first_date(self) -> datetime.date:
        """Get last year's first day's date"""

        return self.last_year_last_date.replace(day=1, month=1)

    @property
    def last_year_last_date(self) -> datetime.date:
        """Get last year's last day's date"""

        return self.year_first_date - datetime.timedelta(days=1)

    @property
    def current_quarter(self) -> int:
        """Get current quarter number"""

        return math.ceil(self.today.month / 3)

    @property
    def current_quarter_first_date(self) -> datetime.date:
        """Get current quarter's first day's date"""
        
        current_quarter = self.current_quarter
        month = 1 if current_quarter == 1 else 4 if current_quarter == 2 else 7 if current_quarter == 3 else 10
        return self.today.replace(day=1, month=month)

    @property
    def previous_quarter_first_date(self) -> datetime.date:
        """Get last quarter's first day's date"""

        return self.previous_quarter_last_date.replace(month=self.previous_quarter_last_date.month - 2, day=1)

    @property
    def previous_quarter_last_date(self) -> datetime.date:
        """Get last quarter's last day's date"""
        
        return self.current_quarter_first_date - datetime.timedelta(days=1)
    
    def weeks_dates(self, start_date, end_date) -> List[datetime.date]:
        """Get all weeks's start date and end date"""

        if start_date.weekday():
            start_date = start_date + datetime.timedelta(days=7)

        weeks = []
        while True:
            week_start = start_date - datetime.timedelta(days=start_date.weekday())
            week_end = week_start + datetime.timedelta(days=6)

            start_date = week_end + datetime.timedelta(days=1)

            weeks.append([week_start, week_end])
            if week_end >= end_date:
                break

        return weeks

    def get_dates(self, start_date: datetime.date, end_date: datetime.date) -> List[datetime.date]:
        """
        Get all dates between start_end and end_date
        
        Input: start_date=2021-03-03, end_date=2021-03-09
        Output: [2021-03-03, 2021-03-04, 2021-03-05, ... 2021-03-09]
        """

        day_difference = (end_date - start_date).days
        dates = [end_date - datetime.timedelta(days=i) for i in range(day_difference + 1)]
        dates.reverse()
        return dates


    def number_human_format(self, num: int) -> str:
        """
        Format a large number to string
        Example: 6543165413 => 6.54B
        """

        num = float('{:.3g}'.format(num))
        magnitude = 0
        while abs(num) >= 1000:
            magnitude += 1
            num /= 1000.0
        return '{}{}'.format('{:f}'.format(num).rstrip('0').rstrip('.'), ['', 'K', 'M', 'B', 'T'][magnitude])


def chunkify(items: list, size: int):
    """
    Split a list into given size
    Example:
        items = [1, 2, 3, 4, 5, 6, 7, 8]
        size = 3
        Output: [[1, 2, 3], [4, 5, 6], [7, 8]]
    """

    splitted = [items[i:i + size] for i in range(0, len(items), size)] 
    return splitted


def check_all_exists(list_1: list, list_2: list):
    """Check if all items of list_1 exists in list_2"""

    return all(item in list_2 for item in list_1)


def get_unique_list(list1):
    """Return only unique values from a list"""

    unique_list = []
    for x in list1:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list


# decorator to calculate duration taken by any function.
def calculate_execution_time(func):
    # added arguments inside the inner1,
    # if function takes any arguments,
    # can be added like this.
    def inner1(*args, **kwargs):
 
        # storing time before function execution
        begin = time.time()
         
        data = func(*args, **kwargs)
 
        # storing time after function execution
        end = time.time()
        print(f"Total time taken in function `{func.__name__}` is {end - begin} second")
        return data
        
    return inner1

